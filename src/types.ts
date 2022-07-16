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

export interface ConnectionProps {
  action_id: string
  signal?: string
  enable_telemetry?: boolean
  app_name?: string
  signal_description?: string
  advanced_use_raw_signal?: boolean
  advanced_use_raw_action_id?: boolean
  onVerificationSuccess: (result: VerificationResponse) => void
  onVerificationError: (error: VerificationErrorResponse) => void
}

export interface AppProps {
  connectionProps: ConnectionProps
  disableRemoteFonts?: boolean
  theme?: 'light' | 'dark'
  debug?: boolean
  onInitSuccess?: () => void
  onInitError?: (error: { error: { message: string; original?: string | Record<string, unknown> | unknown } }) => void
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
  action_id: string
  signal: string
  app_name?: string
  signal_description?: string
}

export interface VerificationRequest {
  id: number
  jsonrpc: '2.0'
  method: 'wld_worldIDVerification'
  params: VerificationRequestParams[]
}

export interface VerificationResponse {
  merkle_root: ABIEncodedValue
  nullifier_hash: ABIEncodedValue
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
