import { styled, lightTheme, darkTheme, globalStyles } from 'stitches'
import { WorldIDBox } from './components/WorldIDBox'
import { PrincipalScene } from 'scenes/PrincipalScene'
import { AppProps } from 'types/app-props'
import { verificationLogic } from './logic/verificationLogic'
import { useActions, useValues } from 'kea'
import { widgetLogic } from './logic/widgetLogic'
import { useEffect, useMemo } from 'react'
import { validateInputParams } from 'utils'

const Wrapper = styled('div', {
  width: '100%',
  maxWidth: '300px',
})

export function Widget(props: AppProps): JSX.Element {
  const { widgetLoading } = useValues(widgetLogic)
  const { disableWidget, enableWidget } = useActions(widgetLogic)

  const builtVerificationLogic = useMemo(() => {
    const { valid, error } = validateInputParams(props.connectionProps)

    if (!valid && props.debug) {
      console.log('Some widget appProps are invalid')
      console.log(error)
    }
    if (!valid) {
      return null
    }

    return verificationLogic(props.connectionProps)
  }, [props.connectionProps, props.debug])

  useEffect(() => {
    if (!props.disableRemoteFonts) {
      globalStyles()
    }
  }, [props.disableRemoteFonts])

  useEffect(() => {
    if (!builtVerificationLogic) {
      return disableWidget()
    }

    enableWidget()
    if (builtVerificationLogic.isMounted()) {
      return
    }

    builtVerificationLogic.mount()
  }, [builtVerificationLogic])

  return (
    <Wrapper className={props.theme === 'dark' ? darkTheme : lightTheme}>
      <WorldIDBox />
      {!widgetLoading && <PrincipalScene />}
    </Wrapper>
  )
}
