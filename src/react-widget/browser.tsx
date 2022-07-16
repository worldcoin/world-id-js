import { render } from 'react-dom'
import { AppProps } from 'types'
import { Widget } from './Widget'

export * as utils from 'utils'

export const init = (elementInput: string | HTMLElement, props: AppProps) => {
  const mountNode = typeof elementInput === 'string' ? document.getElementById(elementInput) : elementInput

  if (!props.disable_remote_fonts) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400&family=Sora:wght@600&display=swap'
    const headElementMatch = document.getElementsByTagName('head')
    if (headElementMatch && headElementMatch[0]) {
      headElementMatch[0].appendChild(link)
    }
  }

  render(<Widget appProps={props} theme="dark" />, mountNode as HTMLElement)
}
