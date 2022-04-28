export type ABIEncodedValue = string

export enum ErrorCodes {
  ConnectionFailed = 'connection_failed',
  VerificationRejected = 'verification_rejected',
  AlreadySigned = 'already_signed',
  InvalidActionID = 'invalid_action_id',
  InvalidSignal = 'invalid_signal',
  UnexpectedResponse = 'unexpected_response',
  GenericError = 'generic_error',
}
export interface EndUserErrorDisplay {
  title?: string
  caption: string
  noRetry?: boolean
}

export interface AppProps {
  actionId: ABIEncodedValue
  signal?: ABIEncodedValue
  enableTelemetry?: boolean
  appName?: string
  signalDescription?: string
  disableRemoteFonts?: boolean
}

export interface CallbackInterface {
  successCallback: (result: VerificationResponse) => void
  failureCallback: (error: VerificationErrorResponse) => void
}

export enum ModalView {
  VerificationFlow,
  LearnMore,
}

export enum VerificationState {
  AwaitingConnection,
  AwaitingVerification,
  Confirmed,
  Failed,
}

export interface VerificationRequestParams {
  actionId: string
  signal: string
  appName?: string
  signalDescription?: string
}

export interface VerificationRequest {
  id: number
  jsonrpc: '2.0'
  method: 'wld_worldIDVerification'
  params: VerificationRequestParams[]
}

export interface VerificationResponse {
  merkleRoot: ABIEncodedValue
  uniquenessHash: ABIEncodedValue
  proof: ABIEncodedValue
}
export interface VerificationErrorResponse {
  code: ErrorCodes
  detail: string
}

// Error response received from WLD app through WalletConnect
export interface ExpectedErrorResponse {
  message: string
  stack: string
}

export enum CTAShownState {
  Undisplayed, // Don't show the modal at all
  Show,
  Hide, // Hide the modal with an animated transition
}
