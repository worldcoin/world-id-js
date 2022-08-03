import { styled, lightTheme, darkTheme, globalStyles } from 'stitches'
import { WorldIDBox } from './components/WorldIDBox'
import { PrincipalScene } from 'scenes/PrincipalScene'
import { useValues } from 'kea'
import { widgetLogic } from './logic/widgetLogic'
import { useEffect } from 'react'
import { AppProps } from 'types'

const Wrapper = styled('div', {
  width: '100%',
  maxWidth: '300px',
})

export function Widget(props: AppProps): JSX.Element {
  widgetLogic(props)
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
