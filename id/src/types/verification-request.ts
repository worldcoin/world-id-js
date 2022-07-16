import { VerificationRequestParams } from './verification-request-params'

export interface VerificationRequest {
  id: number
  jsonrpc: '2.0'
  method: 'wld_worldIDVerification'
  params: VerificationRequestParams[]
}
