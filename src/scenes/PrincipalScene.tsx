import { VerificationState } from 'types'
import { ErrorScene } from './ErrorScene'
import { AwaitingConnectionScene } from './AwaitingConnectionScene'
import { AwaitingVerificationScene } from './AwaitingVerificationScene'
import { ConfirmedScene } from './ConfirmedScene'
import { useValues } from 'kea'
import { verificationLogic } from 'verificationLogic'

export function PrincipalScene(): JSX.Element {
  const { verificationState } = useValues(verificationLogic)

  if (verificationState === VerificationState.AwaitingVerification) {
    return <AwaitingVerificationScene />
  }

  if (verificationState === VerificationState.Failed) {
    return <ErrorScene />
  }

  if (verificationState === VerificationState.Confirmed) {
    return <ConfirmedScene />
  }

  return <AwaitingConnectionScene />
}
