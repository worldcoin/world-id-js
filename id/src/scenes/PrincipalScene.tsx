import { useActions, useValues } from 'kea'
import { Overlay } from 'components/Overlay'
import { AwaitingVerificationScene } from './AwaitingVerificationScene'
import { AwaitingConnectionScene } from './AwaitingConnectionScene'
import { ConfirmedScene } from './ConfirmedScene'
import { ErrorScene } from './ErrorScene'
import { widgetLogic } from 'logics/widgetLogic'
import { verificationLogic } from 'logics/verificationLogic'
import { VerificationState } from 'types'

export function PrincipalScene() {
  const { isModalVisible } = useValues(widgetLogic)
  const { verificationState } = useValues(verificationLogic)
  const { terminate } = useActions(verificationLogic)
  const { disableModal } = useActions(widgetLogic)

  return (
    <Overlay
      open={isModalVisible}
      onClose={() => {
        terminate()
        disableModal()
      }}
    >
      {verificationState === VerificationState.Failed && <ErrorScene />}
      {verificationState === VerificationState.Confirmed && <ConfirmedScene />}
      {verificationState === VerificationState.AwaitingVerification && <AwaitingVerificationScene />}
      {verificationState === VerificationState.AwaitingConnection && <AwaitingConnectionScene />}
    </Overlay>
  )
}
