import { END_USER_ERROR_MESSAGES, ERROR_MESSAGES } from 'const'
import { kea, actions, reducers, path, listeners, events, connect, selectors } from 'kea'
import {
  telemetryConnectionEstablished,
  telemetryVerificationFailed,
  telemetryVerificationLaunched,
  telemetryVerificationSuccess,
} from 'telemetry'
import { buildQRData, buildVerificationRequest, verifyVerificationResponse } from 'utils'
import { widgetLogic } from './widgetLogic'

import type { verificationLogicType } from './verificationLogicType'
import { EndUserErrorDisplay, ErrorCodes, ExpectedErrorResponse, VerificationResponse, VerificationState } from 'types'
import Client from '@walletconnect/sign-client'
import { getSdkError } from '@walletconnect/utils'
import { debug } from 'helpers/debug'

// NOTE: additional type because kea won't export original type from @walletconnect/sign-client for some reason
export type WCClient = Client

const debugClientEvents = (client: WCClient) => {
  const events = [
    'session_proposal',
    'session_update',
    'session_extend',
    'session_ping',
    'session_delete',
    'session_expire',
    'session_request',
    'session_request_sent',
    'session_event',
    'proposal_expire',
  ] as const

  events.forEach((eventName) => {
    client.on(eventName, (event) => {
      debug(eventName, event)
    })
  })
}

export const verificationLogic = kea<verificationLogicType>([
  path(['logic', 'verificationLogic']),
  actions({
    // ANCHOR connection actions
    initConnection: true,
    clientConnect: true,
    setConnectorUri: (connectorUri: string | null) => ({ connectorUri }),
    setTopic: (topic: string | null) => ({ topic }),
    setConnectionStartTime: (startTime: null | number) => ({ startTime }),
    setClient: (client: WCClient | null) => ({ client }),

    // ANCHOR verification actions
    handleConnectionEstablished: (client: WCClient) => ({ client }),
    setVerificationState: (verificationState: VerificationState) => ({ verificationState }),
    setError: (errorCode: ErrorCodes) => ({ errorCode }),
    setSuccess: (result: VerificationResponse) => ({ result }),
    terminate: true,
    tryAgain: true,
    reset: true,
  }),
  connect({
    values: [widgetLogic, ['walletconnectProjectId']],
    actions: [widgetLogic, ['finishWidgetLoading', 'setQrCodeContent', 'disableModal']],
  }),
  reducers({
    // ANCHOR connection reducers
    connectorUri: [
      null as string | null,
      {
        setConnectorUri: (_, { connectorUri }) => connectorUri,
      },
    ],
    topic: [
      null as string | null,
      {
        setTopic: (_, { topic }) => topic,
      },
    ],
    client: [
      null as WCClient | null,
      {
        setClient: (_, { client }) => client,
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
  listeners(({ actions, values }) => ({
    // ANCHOR connection listeners
    initConnection: async () => {
      debug('Starting connection process')
      debug(values.walletconnectProjectId)

      const currentClient = await Client.init({
        projectId: values.walletconnectProjectId,
        metadata: {
          name: 'World ID',
          description: 'Verify with World ID',
          url: '#',
          icons: ['https://worldcoin.org/icons/logo-small.svg'],
        },
      })

      debug('currentClient: ', currentClient)
      actions.setClient(currentClient)

      try {
        debug('Connecting to WalletConnect')

        const { uri, approval } = await currentClient.connect({
          requiredNamespaces: {
            eip155: {
              methods: ['wld_worldIDVerification'],
              chains: ['eip155:1'], // Chain ID used does not matter, since we only perform custom JSON RPC messages (World ID verification)
              events: ['accountsChanged'],
            },
          },
        })

        debug('connector: ', { uri, approval })

        if (uri) {
          actions.setConnectorUri(uri)
          const session = await approval()
          debug('session: ', session)

          if (!session) {
            actions.setError(ErrorCodes.ConnectionFailed)
            return console.error(`Application didn't receive a session: ${session}`)
          }

          debugClientEvents(currentClient)

          // @FIXME: add error handling when session is disconnected
          // currentClient.on('session_delete', () => {
          //   console.log('session_delete')
          //   actions.initConnection()
          // })

          actions.setTopic(session.topic)
          actions.handleConnectionEstablished(currentClient)
        }

        debug('Connection established')
      } catch (error) {
        console.error(`Unable to establish a connection with the WLD app: ${error}`)
      }

      telemetryVerificationLaunched()
    },
    setConnectorUri: ({ connectorUri }) => {
      if (!connectorUri) {
        return
      }

      const qrData = buildQRData(connectorUri)
      const mobileQRCode = buildQRData(connectorUri, window.location.href)
      actions.setQrCodeContent({ default: qrData, mobile: mobileQRCode })
      actions.finishWidgetLoading()
    },

    // ANCHOR verification listeners
    handleConnectionEstablished: async ({ client }) => {
      if (!values.topic) {
        return console.error('No topic found, cannot proceed with verification')
      }

      actions.setVerificationState(VerificationState.AwaitingVerification)

      telemetryConnectionEstablished(
        values.connectionStartTime ? (performance.now() - values.connectionStartTime) / 1000 : undefined
      )

      await client
        .request<{ [x in keyof VerificationResponse]?: string }>({
          topic: values.topic,
          chainId: 'eip155:1',
          request: buildVerificationRequest(widgetLogic.props),
        })
        .then((result) => {
          debug('client.request result: ', result)

          if (verifyVerificationResponse(result)) {
            actions.setSuccess(result as VerificationResponse)
          } else {
            actions.setError(ErrorCodes.UnexpectedResponse)
            console.error(ERROR_MESSAGES[ErrorCodes.UnexpectedResponse], result)
          }
        })
        .catch((error: unknown) => {
          // Verification was unsuccessful. Attempt to determine the specific error, or return a generic error otherwise.
          let errorCode = ErrorCodes.GenericError
          const errorMessage = (error as ExpectedErrorResponse).message
          if (errorMessage && Object.values(ErrorCodes).includes(errorMessage as ErrorCodes)) {
            errorCode = errorMessage as ErrorCodes
          }
          actions.setError(errorCode)
        })
        .finally(async () => {
          if (!values.topic) {
            return console.error('No topic found, cannot proceed with disconnecting')
          }

          await client.disconnect({ topic: values.topic, reason: getSdkError('USER_DISCONNECTED') })
        })
        .catch((error) => {
          // Terminate the session; we only use WalletConnect for one-off transactions
          console.error(`Unable to disconnect: ${error}`)
        })
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
        widgetLogic.props.on_success(values.successResult)
      }
      if (values.verificationState !== VerificationState.Confirmed || !values.successResult) {
        widgetLogic.props.on_error?.({
          code: values.errorResult || ErrorCodes.GenericError,
          detail: values.internalError,
        })
      }

      actions.reset()
    },
    reset: async () => {
      if (!values.client || !values.topic) {
        return console.error('No client or topic found, cannot proceed with resetting')
      }

      await values.client
        .disconnect({ topic: values.topic, reason: getSdkError('USER_DISCONNECTED') })
        .then(() => {
          actions.setClient(null)
          actions.setTopic(null)
        })
        .catch((error) => {
          // Terminate the session; we only use WalletConnect for one-off transactions
          console.error(`Unable to disconnect: ${error}`)
        })
    },
    tryAgain: () => {
      // NOTE `tryAgain` is almost an alias to `reset`, with the distinction we start a new connection right away
      actions.reset()
      actions.initConnection()
    },
  })),
  selectors({
    endUserError: [
      (s) => [s.errorResult],
      (errorResult): EndUserErrorDisplay | null =>
        END_USER_ERROR_MESSAGES[errorResult || ErrorCodes.GenericError] ?? null,
    ],
    internalError: [
      (s) => [s.errorResult],
      (errorResult): string => ERROR_MESSAGES[errorResult || ErrorCodes.GenericError] ?? '',
    ],
  }),
  events(({ actions }) => ({
    afterMount: [actions.initConnection],
  })),
])
