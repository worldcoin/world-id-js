// import { AppProps } from 'types'
import { styled, lightTheme, darkTheme } from 'react-widget/stitches'
import { WorldIDBox } from './WorldIDBox'
import { PrincipalScene } from 'react-widget/scenes/PrincipalScene'
import { AppProps } from 'types'
import { verificationLogic } from './logic/verificationLogic'
import { useValues } from 'kea'
import { widgetLogic } from './logic/widgetLogic'
import { useEffect } from 'react'

// type Props = {
//   appProps: AppProps
//   className?: string
//   onSuccess?: () => void
//   onError?: () => void
//   enabled?: boolean
//   debug?: boolean
// }

const Wrapper = styled('div', {
  width: '100%',
  maxWidth: '300px',
})

export function Widget(props: { appProps: AppProps; theme?: 'dark' | 'light' }): JSX.Element {
  const builtVerificationLogic = verificationLogic(props.appProps)

  useEffect(() => {
    if (builtVerificationLogic.isMounted()) {
      return
    }
    builtVerificationLogic.mount()
    console.log('mounted')
  }, [])
  const { widgetLoading } = useValues(widgetLogic)

  return (
    <Wrapper className={props.theme === 'dark' ? darkTheme : lightTheme}>
      <WorldIDBox />
      {!widgetLoading && <PrincipalScene />}
    </Wrapper>
  )
}
