export type ABIEncodedValue = string

export interface AppProps {
  action_id: string
  signal?: string
  enable_telemetry?: boolean
  app_name?: string
  signal_description?: string
  advanced_use_raw_signal?: boolean
  advanced_use_raw_action_id?: boolean
  disableRemoteFonts?: boolean
  theme?: 'light' | 'dark'
  debug?: boolean
  on_success: (result: VerificationResponse) => void
  on_error: (error: VerificationErrorResponse) => void
  on_init_success?: () => void
  on_init_error?: (errorMessage: string) => void
}

export interface EndUserErrorDisplay {
  title?: string
  caption: string
  noRetry?: boolean
}

export interface VerificationRequest {
  id: number
  jsonrpc: '2.0'
  method: 'wld_worldIDVerification'
  params: VerificationRequestParams[]
}

export interface VerificationRequestParams {
  action_id: string
  signal: string
  app_name?: string
  signal_description?: string
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

export enum ErrorCodes {
  ConnectionFailed = 'connection_failed',
  VerificationRejected = 'verification_rejected',
  AlreadySigned = 'already_signed',
  InvalidActionID = 'invalid_action_id',
  InvalidSignal = 'invalid_signal',
  UnexpectedResponse = 'unexpected_response',
  GenericError = 'generic_error',
}

// Error response received from WLD app through WalletConnect
export interface ExpectedErrorResponse {
  message: string
  stack: string
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