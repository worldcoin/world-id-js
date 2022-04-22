import { AppProps, VerificationRequest, VerificationRequestParams } from 'types'

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
  if (!props.proofSignal) {
    throw new Error('Unexpectedly trying to build verification request without a `proofSignal`.')
  }

  const params: VerificationRequestParams = {
    proofSignal: props.proofSignal,
    externalNullifier: props.externalNullifier,
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
  return !!value.match(ABI_REGEX) && value.length >= 66 // Because `0` contains 66 characters
}

/**
 * Validates the input parameters passed to the package when initializing.
 * @param params `AppProps`
 * @returns `true` if parameters are valid; error is raised otherwise.
 */
export const validateInputParams = (params: AppProps): { valid: boolean; error?: string } => {
  if (!params.externalNullifier) {
    return { valid: false, error: 'The `externalNullifier` parameter is always required.' }
  }
  return { valid: true }
}
