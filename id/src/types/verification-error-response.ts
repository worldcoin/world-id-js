import { ErrorCodes } from './error-codes'

export interface VerificationErrorResponse {
  code: ErrorCodes
  detail: string
}
