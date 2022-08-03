import WalletConnect from '@walletconnect/client'
import { END_USER_ERROR_MESSAGES, ERROR_MESSAGES } from 'const'
import { kea, actions, reducers, path, listeners, props, events, connect, selectors } from 'kea'
import {
  initTelemetry,
  telemetryConnectionEstablished,
  telemetryVerificationFailed,
  telemetryVerificationLaunched,
  telemetryVerificationSuccess,
} from 'telemetry'
import { buildVerificationRequest, verifyVerificationResponse } from 'utils'
import { widgetLogic } from './widgetLogic'

import type { verificationLogicType } from './verificationLogicType'
import {
  AppProps,
  EndUserErrorDisplay,
  ErrorCodes,
  ExpectedErrorResponse,
  VerificationResponse,
  VerificationState,
} from 'types'

let connector: WalletConnect

try {
  connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
  })
} catch (error) {
  console.log('Unable to create WalletConnect connector')
}

export const verificationLogic = kea<verificationLogicType>([
  path(['logic', 'verificationLogic']),
  props({} as AppProps),
  actions({
    // ANCHOR connection actions
    initConnection: true,
    setConnectorUri: (connectorUri: string | null) => ({ connectorUri }),
    setConnectionStartTime: (startTime: null | number) => ({ startTime }),

    // ANCHOR verification actions
    handleConnectionEstablished: true,
    setVerificationState: (verificationState: VerificationState) => ({ verificationState }),
    setError: (errorCode: ErrorCodes) => ({ errorCode }),
    setSuccess: (result: VerificationResponse) => ({ result }),
    terminate: true,
    tryAgain: true,
    reset: true,

    // ANCHOR telemetry actions
    initTelemetry: true,
  }),
  connect({
    actions: [widgetLogic, ['finishWidgetLoading', 'setQrCodeContent', 'enableWidget', 'disableModal']],
  }),
  reducers({
    // ANCHOR connection reducers
    connectorUri: [
      null as string | null,
      {
        setConnectorUri: (_, { connectorUri }) => connectorUri,
      },
    ],
    connectionStartTime: [
      // We store the moment the connection process begins to measure how much time it takes to complete
      null as number | null,
      {
        setConnectionStartTime: (_, { startTime }) => startTime,
      },
    ],

    // ANCHOR verification reducers
    verificationState: [
      VerificationState.AwaitingConnection as VerificationState,
      {
        setVerificationState: (_, { verificationState }) => verificationState,
        setError: () => VerificationState.Failed,
        setSuccess: () => VerificationState.Confirmed,
        reset: (s) =>
          // `Confirmed` is a terminal state, once it has been successful, the flow terminates, no further action can be taken
          s === VerificationState.Confirmed ? VerificationState.Confirmed : VerificationState.AwaitingConnection,
      },
    ],
    errorResult: [
      null as ErrorCodes | null,
      {
        setError: (_, { errorCode }) => errorCode,
        reset: () => null,
      },
    ],
    successResult: [
      null as VerificationResponse | null,
      {
        setSuccess: (_, { result }) => result,
        reset: () => null,
      },
    ],
  }),
  listeners(({ actions, values, props }) => ({
    // ANCHOR connection listeners
    initConnection: async () => {
      if (values.connectorUri) {
        return
      }

      if (connector.connected) {
        try {
          await connector.killSession()
        } catch (error) {
          console.error('Error while killing session', error)
        }
      }

      try {
        await connector.createSession()
        actions.setConnectorUri(connector.uri)
        actions.setConnectionStartTime(performance.now())
      } catch (error) {
        console.log('Error while creating WalletConnect session', error)
      }

      connector.on('connect', async (error: unknown) => {
        if (error) {
          console.log(error)
          actions.setError(ErrorCodes.ConnectionFailed)
          console.error(`Failed to establish connection to WLD app: ${error}`)
        } else {
          actions.handleConnectionEstablished()
        }
      })

      telemetryVerificationLaunched()
    },
    setConnectorUri: ({ connectorUri }) => {
      if (!connectorUri) {
        return
      }

      const bridgeUrl = new URL(connector.bridge)
      const url = new URL('https://worldcoin.org/verify')
      url.searchParams.append('t', connector.handshakeTopic)
      url.searchParams.append('k', connector.key)
      url.searchParams.append('b', bridgeUrl.hostname)
      url.searchParams.append('v', '1')

      actions.setQrCodeContent(url.toString())
      actions.finishWidgetLoading()
      actions.enableWidget()
    },

    // ANCHOR verification listeners
    handleConnectionEstablished: async () => {
      actions.setVerificationState(VerificationState.AwaitingVerification)
      telemetryConnectionEstablished(
        values.connectionStartTime ? (performance.now() - values.connectionStartTime) / 1000 : undefined
      )

      try {
        const result = await connector.sendCustomRequest(buildVerificationRequest(props))
        if (verifyVerificationResponse(result)) {
          actions.setSuccess(result)
        } else {
          actions.setError(ErrorCodes.UnexpectedResponse)
          console.error(ERROR_MESSAGES[ErrorCodes.UnexpectedResponse], result)
        }
      } catch (error: unknown) {
        // Verification was unsuccessful. Attempt to determine the specific error, or return a generic error otherwise.
        let errorCode = ErrorCodes.GenericError
        const errorMessage = (error as ExpectedErrorResponse).message
        if (errorMessage && Object.values(ErrorCodes).includes(errorMessage as ErrorCodes)) {
          errorCode = errorMessage as ErrorCodes
        }
        actions.setError(errorCode)
      }

      // Terminate the session; we only use WalletConnect for one-off transactions
      try {
        try {
          await connector.killSession()
        } catch (error) {
          console.error('Error while killing session', error)
        }
      } catch {}
    },
    setSuccess: async () => {
      telemetryVerificationSuccess()
    },
    setError: ({ errorCode }) => {
      telemetryVerificationFailed(errorCode)
    },
    terminate: async (_, breakpoint) => {
      breakpoint()
      if (values.verificationState === VerificationState.AwaitingConnection) {
        // If the user didn't get past the first step we don't terminate the flow (and resolve external promises),
        // instead we let the user try again immediately.
        return
      }

      if (values.verificationState === VerificationState.Confirmed && values.successResult) {
        props.on_success(values.successResult)
      }
      if (values.verificationState !== VerificationState.Confirmed || !values.successResult) {
        props.on_error({
          code: values.errorResult || ErrorCodes.GenericError,
          detail: values.internalError,
        })
      }

      actions.reset()
    },
    reset: async () => {
      if (connector.connected) {
        try {
          await connector.killSession()
        } catch (error) {
          console.error('Error while killing session', error)
        }
      }
    },
    tryAgain: () => {
      // NOTE `tryAgain` is almost an alias to `reset`, with the distinction we start a new connection right away
      actions.reset()
      actions.initConnection()
    },

    // ANCHOR telemetry listeners
    initTelemetry: async () => {
      initTelemetry(props.enable_telemetry)
    },
  })),
  selectors({
    endUserError: [
      (s) => [s.errorResult],
      (errorResult: ErrorCodes | null): EndUserErrorDisplay | null =>
        END_USER_ERROR_MESSAGES[errorResult || ErrorCodes.GenericError] ?? null,
    ],
    internalError: [
      (s) => [s.errorResult],
      (errorResult: ErrorCodes | null): string => ERROR_MESSAGES[errorResult || ErrorCodes.GenericError] ?? '',
    ],
  }),
  events(({ actions }) => ({
    afterMount: [actions.initConnection, () => actions.initConnection(), actions.initTelemetry],
  })),
])
