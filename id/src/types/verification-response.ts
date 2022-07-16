import { ABIEncodedValue } from './abi-encoded-value'

export interface VerificationResponse {
  merkle_root: ABIEncodedValue
  nullifier_hash: ABIEncodedValue
  proof: ABIEncodedValue
}
