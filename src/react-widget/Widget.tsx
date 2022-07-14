// import { AppProps } from 'types'
import { styled, lightTheme, darkTheme } from 'react-widget/stitches'
import { WorldIDBox } from './WorldIDBox'
import { PrincipalScene } from 'react-widget/scenes/PrincipalScene'

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

export function Widget(props: { theme?: 'dark' | 'light' }): JSX.Element {
  return (
    <Wrapper className={props.theme === 'dark' ? darkTheme : lightTheme}>
      <WorldIDBox />
      <PrincipalScene />
    </Wrapper>
  )
}
