import { kea, actions, reducers, path, events, props, propsChanged, listeners } from 'kea'
import { initTelemetry } from 'telemetry'
import { AppProps, ModalView } from 'types'
import { validateInputParams } from 'utils'

import type { widgetLogicType } from './widgetLogicType'

export const widgetLogic = kea<widgetLogicType>([
  path(['logic', 'widgetLogic']),
  props({} as AppProps),
  actions({
    processProps: (props: AppProps) => ({ props }),
    disableWidget: true,
    enableWidget: true,
    initWidget: true,
    unInitWidget: true,
    finishWidgetLoading: true,
    activateModal: true,
    disableModal: true,
    toggleModal: true,
    initTelemetry: true,
    setModalView: (view: ModalView) => ({ view }),
    setQrCodeContent: (content: string) => ({ content }),
    setIsDevMode: (isDev: boolean) => ({ isDev }),
  }),
  reducers({
    // Whether the widget is initialized with minimum valid parameters (i.e. action_id)
    isWidgetInitialized: [
      false,
      {
        initWidget: () => true,
        unInitWidget: () => false,
      },
    ],

    // Whether the widget is enabled and ready to be used (i.e. signal is properly set)
    isWidgetEnabled: [
      false,
      {
        enableWidget: () => true,
        disableWidget: () => false,
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
  listeners(({ actions }) => ({
    processProps: async ({ props }) => {
      const { valid, error } = validateInputParams(props)

      if (!valid) {
        console.error(error)
      }

      if (valid) {
        actions.initWidget()
        if (props.signal) {
          actions.enableWidget()
        } else {
          actions.disableWidget()
        }
      } else {
        actions.unInitWidget()
      }

      initTelemetry(props.enable_telemetry)
    },
  })),
  propsChanged(({ actions, props }) => {
    actions.processProps(props)
  }),
  events(({ actions, props }) => ({
    afterMount: () => {
      actions.processProps(props)
      actions.setIsDevMode(typeof window !== 'undefined' ? window.location.hostname === 'localhost' : false)
    },
  })),
])
