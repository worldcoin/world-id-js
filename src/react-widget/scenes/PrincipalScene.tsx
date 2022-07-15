// import { VerificationState } from 'types'
import { useActions, useValues } from 'kea'
// import { worldLogic } from 'worldLogic'
// import { verificationLogic } from 'verificationLogic'

import { Overlay } from 'react-widget/components/Overlay'
import { AwaitingVerificationScene } from './AwaitingVerificationScene'
import { AwaitingConnectionScene } from './AwaitingConnectionScene'
import { ConfirmedScene } from './ConfirmedScene'
import { ErrorScene } from './ErrorScene'
import { widgetLogic } from 'react-widget/logic/widgetLogic'
import { VerificationState } from 'react-widget/types/verification-state'
import { verificationLogic } from 'react-widget/logic/verificationLogic'

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
