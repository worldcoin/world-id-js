import { VerificationState } from 'types'
import { useActions, useValues } from 'kea'
import { worldLogic } from 'worldLogic'
import { verificationLogic } from 'verificationLogic'

import { Overlay } from 'react-widget/components/Overlay'
import { AwaitingVerificationScene } from './AwaitingVerificationScene'
import { AwaitingConnectionScene } from './AwaitingConnectionScene'
import { ConfirmedScene } from './ConfirmedScene'
import { ErrorScene } from './ErrorScene'

export function PrincipalScene() {
  const { isAppActive } = useValues(worldLogic)
  const { verificationState } = useValues(verificationLogic)
  const { terminate } = useActions(worldLogic)

  return (
    <Overlay open={isAppActive} onClose={terminate}>
      {verificationState === VerificationState.Failed && <ErrorScene />}
      {verificationState === VerificationState.Confirmed && <ConfirmedScene />}
      {verificationState === VerificationState.AwaitingVerification && <AwaitingVerificationScene />}
      {verificationState === VerificationState.AwaitingConnection && <AwaitingConnectionScene />}
    </Overlay>
  )
}
