import { kea, actions, reducers, path, events } from 'kea'
import { ModalView } from 'types/modal-view'

import type { widgetLogicType } from './widgetLogicType'

export const widgetLogic = kea<widgetLogicType>([
  path(['logic', 'widgetLogic']),
  actions({
    disableWidget: true,
    enableWidget: true,
    finishWidgetLoading: true,
    activateModal: true,
    disableModal: true,
    toggleModal: true,
    setModalView: (view: ModalView) => ({ view }),
    setQrCodeContent: (content: string) => ({ content }),
    setIsDevMode: (isDev: boolean) => ({ isDev }),
  }),
  reducers({
    isWidgetAvailable: [
      false,
      {
        disableWidget: () => false,
        enableWidget: () => true,
      },
    ],

    widgetLoading: [
      true,
      {
        finishWidgetLoading: () => false,
      },
    ],

    qrCodeContent: [
      null as string | null,
      {
        setQrCodeContent: (_, { content }) => content,
      },
    ],
    isDevMode: [
      false,
      {
        setIsDevMode: (_, { isDev }) => isDev,
      },
    ],

    isModalVisible: [
      false,
      {
        activateModal: () => true,
        disableModal: () => false,
        toggleModal: (state) => !state,
      },
    ],

    modalView: [
      ModalView.VerificationFlow as ModalView,
      {
        setModalView: (_, { view }) => view,
      },
    ],
  }),
  events(({ actions }) => ({
    // FIXME make dev mode detections with selectors (typegen not generates selectors)
    afterMount: () =>
      actions.setIsDevMode(typeof window !== 'undefined' ? window.location.hostname === 'localhost' : false),
  })),
])
