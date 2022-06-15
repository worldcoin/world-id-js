import { AppProps, VerificationRequest, VerificationRequestParams } from 'types'
import sha3 from 'js-sha3'
import { arrayify, concat, hexlify } from '@ethersproject/bytes'

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
    signal: props.advancedUseRawSignal ? props.signal : hashBytes(props.signal).digest,
    actionId: props.advancedUseRawActionId ? props.actionId : hashBytes(props.actionId).digest,
  }

  if (props.appName) {
    params.appName = props.appName
  }

  if (props.signalDescription) {
    params.signalDescription = props.signalDescription
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
  const merkleRoot = 'merkleRoot' in result ? result.merkleRoot : undefined
  const nullifierHash = 'nullifierHash' in result ? result.nullifierHash : undefined
  const proof = 'proof' in result ? result.proof : undefined

  for (const attr of [merkleRoot, nullifierHash, proof]) {
    if (!attr || !validateABILikeEncoding(attr)) {
      return false
    }
  }

  return true
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
  if (!params.actionId) {
    return { valid: false, error: 'The `actionId` parameter is always required.' }
  }

  if (params.advancedUseRawActionId && !validateABILikeEncoding(params.actionId)) {
    return {
      valid: false,
      error: `You enabled 'advancedUseRawActionId' which uses the action ID raw (without any additional hashing or encoding),
        but the action ID you provided does not look to be validly hashed or encoded. Please check
        https://id.worldcoin.org/docs/js/reference#parameters for details.`,
    }
  }

  if (params.advancedUseRawSignal && params.signal && !validateABILikeEncoding(params.signal)) {
    return {
      valid: false,
      error: `You enabled 'advancedUseRawSignal' which uses the signal raw (without any additional hashing or encoding),
        but the signal you provided does not look to be validly hashed or encoded. Please check
        https://id.worldcoin.org/docs/js/reference#parameters for details.`,
    }
  }

  return { valid: true }
}

/**
 * Hashes an input using the `keccak256` hashing function used across the World ID protocol, to be used as
 * a ZKP input.
 * @param input - Input to hash (if it's a string, it'll be converted to bytes first)
 * @returns hash
 */
export function hashBytes(input: string | Buffer): { hash: BigInt; digest: string } {
  const bytesInput = Buffer.isBuffer(input) ? input : Buffer.from(input)
  const hash = BigInt(keccak256(bytesInput)) >> BigInt(8)
  return { hash, digest: `0x${hash.toString(16)}` }
}

/**
 * Partial implementation of `keccak256` hash from @ethersproject/solidity; only supports hashing a single BytesLike value
 * @param value value to hash
 * @returns
 */
export function keccak256(value: Buffer): string {
  const tight: Array<Uint8Array> = [arrayify(value)]
  const data = hexlify(concat(tight))
  return '0x' + sha3.keccak_256(arrayify(data))
}
