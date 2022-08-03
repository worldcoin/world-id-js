import { styled, lightTheme, darkTheme, globalStyles } from 'stitches'
import { WorldIDBox } from './components/WorldIDBox'
import { PrincipalScene } from 'scenes/PrincipalScene'
import { verificationLogic } from './logic/verificationLogic'
import { useActions, useValues } from 'kea'
import { widgetLogic } from './logic/widgetLogic'
import { useEffect, useMemo } from 'react'
import { validateInputParams } from 'utils'
import { AppProps } from 'types'

const Wrapper = styled('div', {
  width: '100%',
  maxWidth: '300px',
})

export function WorldIDWidget(props: AppProps): JSX.Element {
  const { widgetLoading } = useValues(widgetLogic)
  const { disableWidget, enableWidget } = useActions(widgetLogic)

  const builtVerificationLogic = useMemo(() => {
    const { valid, error } = validateInputParams(props)

    if (!valid && props.debug) {
      console.error(error)
    }
    if (!valid) {
      return null
    }

    return verificationLogic(props)
  }, [props])

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
