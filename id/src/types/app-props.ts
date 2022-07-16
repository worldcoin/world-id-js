import { ConnectionProps } from './connection-props'

export interface AppProps {
  connectionProps: ConnectionProps
  disableRemoteFonts?: boolean
  theme?: 'light' | 'dark'
  debug?: boolean
  onInitSuccess?: () => void
  onInitError?: (error: { error: { message: string; original?: string | Record<string, unknown> | unknown } }) => void
}
