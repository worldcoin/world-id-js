import { EndUserErrorDisplay, ErrorCodes } from 'types'

/**
 * Included in thrown exceptions to the client app when the process fails.
 */
export const ERROR_MESSAGES: Record<ErrorCodes, string> = {
  [ErrorCodes.ConnectionFailed]:
    'Unable to establish connection to Worldcoin app. Please verify internet connection and try again.',
  [ErrorCodes.VerificationRejected]: 'User rejected verification request in Worldcoin app.',
  [ErrorCodes.AlreadySigned]: 'User has previously signed and submitted proof for this action.',
  [ErrorCodes.InvalidActionID]:
    "The provided action ID is not valid. Make sure it's a valid string or it's properly hashed and encoded if using raw (advanced). Review the docs for details.",
  [ErrorCodes.InvalidSignal]:
    "The provided signal is not valid. Make sure it's a valid string or it's properly hashed and encoded if using raw (advanced). Review the docs for details.",
  [ErrorCodes.UnexpectedResponse]: 'Received an unexpected response from WLD app. Please try again.',
  [ErrorCodes.GenericError]: 'An unhandled exception ocurred. Please try again.',
}

/**
 * Used to show user friendly errors in the UI (ErrorScene.tsx).
 */
export const END_USER_ERROR_MESSAGES: Partial<Record<ErrorCodes, EndUserErrorDisplay>> = {
  [ErrorCodes.ConnectionFailed]: {
    title: 'Unable to connect',
    caption:
      'We could not establish a connection to the Worldcoin app. Please verify your internet connection and try again.',
  },
  [ErrorCodes.VerificationRejected]: {
    title: 'Verification rejected!',
    caption: 'You rejected the verification request in the Worldcoin app. If this was a mistake, please try again.',
    noRetry: true,
  },
  [ErrorCodes.AlreadySigned]: {
    title: 'Previously verified!',
    caption: 'You have already verified your identity for this action once. You cannot verify the same action twice.',
    noRetry: true,
  },
  [ErrorCodes.InvalidActionID]: {
    caption: 'The verification request was invalid. Please contact the app before trying again.',
    noRetry: true,
  },
  [ErrorCodes.InvalidSignal]: {
    caption: 'The verification request was invalid. Please contact the app before trying again.',
    noRetry: true,
  },
}

export const breakpoints = {
  sm: '768px',
}
