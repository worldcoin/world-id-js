import { arrayify, BytesLike, concat, hexlify, isBytesLike } from '@ethersproject/bytes'
import { devPortalUrl } from 'const'
import * as jose from 'jose'
import sha3 from 'js-sha3'
import { AppProps, HashFunctionOutput, VerificationRequest, VerificationRequestParams } from 'types'

/**
 * Generates a random integer between a specified range
 * @param min Minimum number in range (inclusive)
 * @param max Maximum number in range (inclusive)
 * @returns Number between range
 */
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const buildVerificationRequest = (props: AppProps): VerificationRequest => {
  if (!props.signal) {
    throw new Error('Unexpectedly trying to build verification request without a `signal`.')
  }

  const params: VerificationRequestParams = {
    signal: props.advanced_use_raw_signal ? props.signal : worldIDHash(props.signal).digest,
    action_id: props.advanced_use_raw_action_id ? props.action_id : worldIDHash(props.action_id).digest,
  }

  if (props.app_name) {
    params.app_name = props.app_name
  }

  if (props.signal_description) {
    params.signal_description = props.signal_description
  }

  return {
    id: randomNumber(100000, 9999999),
    jsonrpc: '2.0',
    method: 'wld_worldIDVerification',
    params: [params],
  }
}

/**
 * Verifies that the response from the WLD app is valid
 * @param result expects a valid `VerificationResponse`
 */
export const verifyVerificationResponse = (result: Record<string, string | undefined>): boolean => {
  const merkle_root = 'merkle_root' in result ? result.merkle_root : undefined
  const nullifier_hash = 'nullifier_hash' in result ? result.nullifier_hash : undefined
  const proof = 'proof' in result ? result.proof : undefined

  for (const attr of [merkle_root, nullifier_hash, proof]) {
    if (!attr || !validateABILikeEncoding(attr)) {
      return false
    }
  }

  return true
}

/**
 * Verifies JWT
 * @param token JWT token to verify
 */
export const verifyJWT = async (token: string): Promise<boolean> => {
  try {
    const jsonKeys = (await (await fetch(`${devPortalUrl}/api/v1/jwks`)).json()) as {
      keys: Array<{ e: string; n: string; kty: string; kid: string }>
    }

    const kid = jose.decodeProtectedHeader(token).kid
    const jsonKey = jsonKeys.keys.find((key) => key.kid === kid)

    if (!jsonKey) {
      return false
    }

    const publicKey = await jose.importJWK(jsonKey, 'PS256')
    const { payload } = await jose.jwtVerify(token, publicKey, { issuer: devPortalUrl })

    return !!payload.verified
  } catch (err) {
    console.log(err)
    return false
  }
}

/**
 * Validates that an string looks like an ABI-encoded string. Very basic format-like check.
 * The WLD app validates the actual values.
 * @param value string to validate
 * @returns `true` if the value looks like an ABI-encoded string; `false` otherwise
 */
export const validateABILikeEncoding = (value: string): boolean => {
  const ABI_REGEX = /^0x[\dabcdef]+$/
  return !!value.toString().match(ABI_REGEX) && value.length >= 66 // Because `0` contains 66 characters
}

/**
 * Validates the input parameters passed to the package when initializing.
 * @param params `AppProps`
 * @returns `true` if parameters are valid; error is raised otherwise.
 */
export const validateInputParams = (params: AppProps): { valid: boolean; error?: string } => {
  if (!params.action_id) {
    return { valid: false, error: 'The `action_id` parameter cannot be empty.' }
  }

  if (params.advanced_use_raw_action_id && !validateABILikeEncoding(params.action_id)) {
    return {
      valid: false,
      error: `You enabled 'advanced_use_raw_action_id' which uses the action ID raw (without any additional hashing or encoding),
        but the action ID you provided does not look to be validly hashed or encoded. Please check
        https://id.worldcoin.org/docs/js/reference#parameters for details.`,
    }
  }

  if (params.advanced_use_raw_signal && params.signal && !validateABILikeEncoding(params.signal)) {
    return {
      valid: false,
      error: `You enabled 'advanced_use_raw_signal' which uses the signal raw (without any additional hashing or encoding),
        but the signal you provided does not look to be validly hashed or encoded. Please check
        https://id.worldcoin.org/docs/js/reference#parameters for details.`,
    }
  }

  return { valid: true }
}

/**
 * Hashes an input using the `keccak256` hashing function used across the World ID protocol, to be used as
 * a ZKP input. The function will try to determine the best hashing mechanism, if the string already looks like hex-encoded
 * bytes (e.g. `0x0000000000000000000000000000000000000000`), it will be hashed directly.
 * @param input Any string, hex-like string, bytes represented as a hex string.
 * @returns
 */
export function worldIDHash(input: BytesLike | Buffer): HashFunctionOutput {
  if (isBytesLike(input)) {
    return hashEncodedBytes(input)
  }
  return hashString(input)
}

/**
 * Using `worldIDHash` is recommended! Use this if you're certain you want to hash a string.
 * Converts an input to bytes and then hashes it with the World ID protocol hashing function.
 * @param input - String to hash
 * @returns hash
 */
export function hashString(input: string): HashFunctionOutput {
  const bytesInput = Buffer.from(input)
  return hashEncodedBytes(bytesInput)
}

/**
 * Using `worldIDHash` is recommended! Use this if you're certain you want to hash raw bytes.
 * Hashes raw bytes input using the `keccak256` hashing function used across the World ID protocol, to be used as
 * a ZKP input. Example use cases include when you're hashing an address to be verified in a smart contract.
 * @param input - Bytes represented as a hex string.
 * @returns
 */
export function hashEncodedBytes(input: BytesLike): HashFunctionOutput {
  const hash = BigInt(keccak256(input)) >> BigInt(8)
  const rawDigest = hash.toString(16)
  return { hash, digest: `0x${rawDigest.padStart(64, '0')}` }
}

/**
 * Partial implementation of `keccak256` hash from @ethersproject/solidity; only supports hashing a single BytesLike value
 * @param value value to hash
 * @returns
 */
export function keccak256(value: BytesLike): string {
  const tight: Array<Uint8Array> = [arrayify(value)]
  const data = hexlify(concat(tight))
  return '0x' + sha3.keccak_256(arrayify(data))
}

/**
 * Build data for QR Code
 * @param uri string of wc uri
 * @param returnUrl string; url of the website to return to after verification is complete
 * @returns string
 */
export function buildQRData(uri: string, returnUrl?: string): string {
  const result = new window.URL('https://worldcoin.org/verify')
  result.searchParams.append('w', uri)

  // returnUrl optionally instructs the WLD app how to return to the website after the verification is complete (intended for mobile only).
  if (returnUrl) result.searchParams.append('r', returnUrl)

  console.log(`WC URI: ${uri}`) // DEBUG
  console.log(`WLD URL: ${result.toString()}`) // DEBUG

  return result.toString()
}
