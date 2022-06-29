import { actions, connect, events, kea, listeners, path, props, reducers, selectors } from 'kea'
import { initTelemetry, telemetryVerificationLaunched } from 'telemetry'
import { CTAShownState, ErrorCodes, ModalView, VerificationState, AppProps, CallbackInterface } from 'types'
import { verificationLogic } from 'verificationLogic'
import type { worldLogicType } from './worldLogicType'

export const worldLogic = kea<worldLogicType>([
  path(['worldId', 'worldLogic']),
  props({} as AppProps),
  actions({
    activate: true,
    terminate: true,
    enable: (payload: CallbackInterface) => ({ payload }),
    showLearnMore: true,
    toggleCTAShown: true,
    setModalView: (modalView: ModalView) => ({ modalView }),
    setAppEnabled: (enabled: boolean) => ({ enabled }),
    initTelemetry: true,
  }),
  connect({
    actions: [verificationLogic, ['reset']],
  }),
  reducers({
    modalView: [
      ModalView.VerificationFlow as ModalView,
      {
        setModalView: (_, { modalView }) => modalView,
        terminate: () => ModalView.VerificationFlow,
      },
    ],
    // Whether the main modal is shown and the user is actively interacting with the app
    isAppActive: [
      false,
      {
        activate: () => true,
        terminate: () => false,
        setAppEnabled: (state, { enabled }) => (enabled ? state : false), // App becomes inactive if it becomes disabled
      },
    ],
    ctaShownState: [
      CTAShownState.Undisplayed as CTAShownState,
      {
        toggleCTAShown: (state) => {
          if (state === CTAShownState.Show) {
            return CTAShownState.Hide
          }
          if (state === CTAShownState.Hide) {
            return CTAShownState.Undisplayed
          }
          return CTAShownState.Show
        },
        terminate: () => CTAShownState.Undisplayed,
      },
    ],
    isAppEnabled: [
      // Whether the entire app is enabled and ready to launch the verification flow. It means the client is subscribed
      // to receive callbacks too.
      false,
      {
        enable: () => true,
        reset: () => false,
      },
    ],
    callbacks: [
      {} as CallbackInterface,
      {
        enable: (_, { payload }) => payload,
      },
    ],
  }),
  listeners(({ props, values, actions }) => ({
    terminate: async (_, breakpoint) => {
      breakpoint()
      if (verificationLogic.values.verificationState === VerificationState.AwaitingConnection) {
        // If the user didn't get past the first step we don't terminate the flow (and resolve external promises),
        // instead we let the user try again immediately.
        return
      }
      if (
        verificationLogic.values.verificationState === VerificationState.Confirmed &&
        verificationLogic.values.successResult
      ) {
        values.callbacks.successCallback(verificationLogic.values.successResult)
      } else {
        values.callbacks.failureCallback({
          code: verificationLogic.values.errorResult || ErrorCodes.GenericError,
          detail: verificationLogic.values.internalError,
        })
      }
      verificationLogic.actions.reset()
    },
    activate: async (_, breakpoint) => {
      verificationLogic.actions.initConnection()
      telemetryVerificationLaunched()
      await breakpoint(100)
      if (values.ctaShownState === CTAShownState.Undisplayed) {
        actions.toggleCTAShown()
      }
    },
    showLearnMore: async (_, breakpoint) => {
      breakpoint()
      if (!values.isAppActive) {
        actions.activate()
      }
      actions.setModalView(ModalView.LearnMore)
    },
    toggleCTAShown: async (_, breakpoint) => {
      await breakpoint(500)
      if (values.ctaShownState === CTAShownState.Hide) {
        actions.toggleCTAShown() // After 0.5s the animation will be over, remove from DOM completely.
      }
    },
    initTelemetry: async () => {
      initTelemetry(props.enable_telemetry)
    },
    setModalView: async () => {
      actions.toggleCTAShown()
    },
  })),
  selectors(({ actions, props }) => ({
    hideModalCloseButton: [
      () => [verificationLogic.selectors.verificationState],
      (verificationState: VerificationState): boolean =>
        verificationState === VerificationState.Confirmed || verificationState == VerificationState.Failed,
    ],
    modalGoBack: [
      (s) => [s.modalView],
      (modalView: ModalView) =>
        modalView === ModalView.LearnMore ? () => actions.setModalView(ModalView.VerificationFlow) : undefined,
    ],
    // Whether the app has reached a terminal state
    isAppTerminated: [
      () => [verificationLogic.selectors.verificationState],
      (verificationState: VerificationState): boolean => verificationState === VerificationState.Confirmed,
    ],
    theme: [() => [], () => props.theme],
    isDevMode: [() => [], () => window.location.hostname === 'localhost'],
  })),
  events(({ actions }) => ({
    afterMount: [actions.initTelemetry],
  })),
])
