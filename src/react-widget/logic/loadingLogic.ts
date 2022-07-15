import WalletConnect from '@walletconnect/client'
// import { ERROR_MESSAGES } from 'const'
import { kea, actions, reducers, path, listeners, props, events, connect } from 'kea'
import { AppProps } from 'types'
// import { buildVerificationRequest, verifyVerificationResponse } from 'utils'

import type { loadingLogicType } from './loadingLogicType'
import { widgetLogic } from './widgetLogic'

export enum ConnectionResult {
  Success,
  Error,
}

let connector: WalletConnect

try {
  connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
  })
} catch (error) {
  console.log('Unable to create WalletConnect connector')
}

export const loadingLogic = kea<loadingLogicType>([
  path(['react-widget', 'logic', 'loadingLogic']),
  props({} as AppProps),
  actions({
    initConnection: true,
    handleConnectionEstablished: true,
    setConnectorUri: (connectorUri: string | null) => ({ connectorUri }),
    setConnectionStartTime: (startTime: null | number) => ({ startTime }),
  }),
  connect({
    actions: [widgetLogic, ['finishWidgetLoading', 'setQrCodeContent', 'enableWidget']],
  }),
  reducers({
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
  }),
  listeners(({ actions, values }) => ({
    initConnection: async () => {
      if (values.connectorUri) {
        return
      }

      if (connector.connected) {
        await connector.killSession()
      }

      try {
        await connector.createSession()
        actions.setConnectorUri(connector.uri)
        actions.setConnectionStartTime(performance.now())
      } catch (error) {
        console.log('Error while creating WalletConnect session')
      }
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
  })),
  events(({ actions }) => ({
    afterMount: [actions.initConnection, () => actions.initConnection()],
  })),
])
