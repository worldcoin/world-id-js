import { VerificationErrorResponse } from './verification-error-response'
import { VerificationResponse } from './verification-response'

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
