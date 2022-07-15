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
import { ModalView } from 'react-widget/types/modal-view'

export function PrincipalScene() {
  const { isModalVisible, modalView } = useValues(widgetLogic)
  const { disableModal } = useActions(widgetLogic)
  // const { verificationState } = useValues(verificationLogic)

  return (
    <Overlay open={isModalVisible} onClose={disableModal}>
      {modalView === ModalView.Failed && <ErrorScene />}
      {modalView === ModalView.Confirmed && <ConfirmedScene />}
      {modalView === ModalView.AwaitingVerification && <AwaitingVerificationScene />}
      {modalView === ModalView.AwaitingConnection && <AwaitingConnectionScene />}
    </Overlay>
  )
}
