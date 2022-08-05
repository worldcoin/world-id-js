import { styled, lightTheme, darkTheme, globalStyles } from 'stitches'
import { WorldIDBox } from './components/WorldIDBox'
import { PrincipalScene } from 'scenes/PrincipalScene'
import { useValues } from 'kea'
import { widgetLogic } from './logic/widgetLogic'
import { useEffect } from 'react'
import { AppProps, WidgetProps } from 'types'

const Wrapper = styled('div', {
  width: '100%',
  maxWidth: '300px',
})

export function WorldIDWidget(props: WidgetProps): JSX.Element {
  const transformedProps = {
    ...props,
    action_id: props.actionId,
    enable_telemetry: props.enableTelemetry,
    app_name: props.appName,
    signal_description: props.signalDescription,
    advanced_use_raw_signal: props.advancedUseRawSignal,
    advanced_use_raw_action_id: props.advancedUseRawActionId,
    disable_remote_fonts: props.disableRemoteFonts,
    on_success: props.onSuccess,
    on_error: props.onError,
    on_init_success: props.onInitSuccess,
    on_init_error: props.onInitError,
  } as AppProps

  widgetLogic(transformedProps)
  const { widgetLoading } = useValues(widgetLogic)

  useEffect(() => {
    if (!props.disableRemoteFonts) {
      globalStyles()
    }
  }, [props.disableRemoteFonts])

  return (
    <Wrapper className={props.theme === 'dark' ? darkTheme : lightTheme}>
      <WorldIDBox />
      {!widgetLoading && <PrincipalScene />}
    </Wrapper>
  )
}
