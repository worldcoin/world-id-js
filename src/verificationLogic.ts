import WalletConnect from '@walletconnect/client'
import { END_USER_ERROR_MESSAGES, ERROR_MESSAGES } from 'const'
import { actions, kea, listeners, path, reducers, selectors } from 'kea'
import { telemetryConnectionEstablished, telemetryVerificationFailed, telemetryVerificationSuccess } from 'telemetry'
import {
  CTAShownState,
  EndUserErrorDisplay,
  ErrorCodes,
  ExpectedErrorResponse,
  VerificationResponse,
  VerificationState,
} from 'types'
import { buildVerificationRequest, verifyVerificationResponse } from 'utils'
import { worldLogic } from 'worldLogic'
import type { verificationLogicType } from './verificationLogicType'

const connector = new WalletConnect({
  bridge: 'https://bridge.walletconnect.org',
})

export const verificationLogic = kea<verificationLogicType>([
  path(['worldId', 'verificationLogic']),
  actions({
    initConnection: true,
    handleConnectionEstablished: true,
    tryAgain: true,
    reset: true,
    setVerificationState: (verificationState: VerificationState) => ({ verificationState }),
    setConnectorUri: (connectorUri: string | null) => ({ connectorUri }),
    setErrored: (errorCode: ErrorCodes) => ({ errorCode }),
    setSuccess: (result: VerificationResponse) => ({ result }),
    setConnectionStartTime: (startTime: null | number) => ({ startTime }),
  }),
  reducers({
    verificationState: [
      VerificationState.AwaitingConnection as VerificationState,
      {
        setVerificationState: (_, { verificationState }) => verificationState,
        setErrored: () => VerificationState.Failed,
        setSuccess: () => VerificationState.Confirmed,
        reset: (s) =>
          // `Confirmed` is a terminal state, once it has been successful, the flow terminates, no further action can be taken
          s === VerificationState.Confirmed ? VerificationState.Confirmed : VerificationState.AwaitingConnection,
      },
    ],
    connectorUri: [
      null as string | null,
      {
        setConnectorUri: (_, { connectorUri }) => connectorUri,
        setErrored: () => null,
        setSuccess: () => null,
        reset: () => null,
      },
    ],
    errorResult: [
      null as ErrorCodes | null,
      {
        setErrored: (_, { errorCode }) => errorCode,
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
    connectionStartTime: [
      // We store the moment the connection process begins to measure how much time it takes to complete
      null as number | null,
      {
        setConnectionStartTime: (_, { startTime }) => startTime,
      },
    ],
  }),
  listeners(({ actions, values }) => ({
    initConnection: async () => {
      if (values.connectorUri) {
        // Connection already initialized
        return
      }

      // Should never be connected when initializing connection; could happen after a race condition
      if (connector.connected) {
        await connector.killSession()
      }

      await connector.createSession()
      actions.setConnectorUri(connector.uri)
      actions.setConnectionStartTime(performance.now())

      connector.on('connect', async (error: unknown) => {
        if (error) {
          actions.setErrored(ErrorCodes.ConnectionFailed)
          console.error(`Failed to establish connection to WLD app: ${error}`)
        } else {
          actions.handleConnectionEstablished()
        }
      })
    },
    handleConnectionEstablished: async () => {
      actions.setVerificationState(VerificationState.AwaitingVerification)
      telemetryConnectionEstablished(
        values.connectionStartTime ? (performance.now() - values.connectionStartTime) / 1000 : undefined
      )

      try {
        const result = await connector.sendCustomRequest(buildVerificationRequest(worldLogic.props))
        if (verifyVerificationResponse(result)) {
          actions.setSuccess(result)
        } else {
          actions.setErrored(ErrorCodes.UnexpectedResponse)
          console.error(ERROR_MESSAGES[ErrorCodes.UnexpectedResponse], result)
        }
      } catch (e: unknown) {
        // Verification was unsuccessful. Attempt to determine the specific error, or return a generic error otherwise.
        let errorCode = ErrorCodes.GenericError
        const errorMessage = (e as ExpectedErrorResponse).message
        if (errorMessage && Object.values(ErrorCodes).includes(errorMessage as ErrorCodes)) {
          errorCode = errorMessage as ErrorCodes
        }
        actions.setErrored(errorCode)
      }

      // Terminate the session; we only use WalletConnect for one-off transactions
      try {
        await connector.killSession()
      } catch {}
    },
    reset: async () => {
      if (connector.connected) {
        await connector.killSession()
      }
    },
    tryAgain: () => {
      // `tryAgain` is almost an alias to `reset`, with the distinction we start a new connection right away
      actions.reset()
      actions.initConnection()
    },
    setVerificationState: async ({ verificationState }) => {
      // After the verification flow progresses, hide the CTA modal if it's still shown
      if (
        verificationState !== VerificationState.AwaitingConnection &&
        worldLogic.values.ctaShownState === CTAShownState.Show
      ) {
        worldLogic.actions.toggleCTAShown()
      }
    },
    setSuccess: async () => {
      telemetryVerificationSuccess()
    },
    setErrored: async ({ errorCode }) => {
      telemetryVerificationFailed(errorCode)
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
      (errorResult): string => ERROR_MESSAGES[errorResult || ErrorCodes.GenericError],
    ],
    qrCodeContent: [
      (s) => [s.connectorUri],
      (connectorUri): string | null => {
        if (!connectorUri) {
          return null
        }

        const bridgeUrl = new URL(connector.bridge)
        const url = new URL('https://worldcoin.org/verify')
        url.searchParams.append('t', connector.handshakeTopic)
        url.searchParams.append('k', connector.key)
        url.searchParams.append('b', bridgeUrl.hostname)
        url.searchParams.append('v', '1')

        return url.toString()
      },
    ],
  }),
])
