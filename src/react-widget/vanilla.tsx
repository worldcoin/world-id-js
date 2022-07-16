import { useValues } from 'kea'
import { render } from 'react-dom'
import { AppProps } from 'types'
import { vanillaWidgetLogic } from './logic/vanillaWidgetLogic'
import { Widget } from './Widget'

const VanillaWidget = (): JSX.Element => {
  const { params } = useValues(vanillaWidgetLogic)

  return <Widget {...params} />
}

export * as utils from 'utils'

/**
 * Initializes World ID, will render the World ID box on the provided element. The box will be
 * disabled until `.activate()` is called.
 * @param elementInput ID of HTML element or DOM node to mount World ID on
 * @param props See `AppProps` for details
 */
export const init = (elementInput: string | HTMLElement, props: AppProps): void => {
  const mountNode = typeof elementInput === 'string' ? document.getElementById(elementInput) : elementInput

  if (!mountNode) {
    throw new Error('Element to mount World ID not found. Please make sure the element is valid.')
  }

  if (!(mountNode instanceof HTMLElement)) {
    throw new Error('The passed element parameter does not look like a valid HTML element.')
  }

  const startApp = () => {
    if (!vanillaWidgetLogic.isMounted()) {
      vanillaWidgetLogic.mount()
    }

    vanillaWidgetLogic.actions.updateParams(props)

    if (!props.disableRemoteFonts) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400&family=Sora:wght@600&display=swap'
      const headElementMatch = document.getElementsByTagName('head')
      if (headElementMatch && headElementMatch[0]) {
        headElementMatch[0].appendChild(link)
      }
    }

    render(<VanillaWidget />, mountNode as HTMLElement)
  }

  if (/complete|interactive|loaded/.test(document.readyState)) {
    // In case the document has finished parsing, document's readyState will
    // Be one of "complete", "interactive" or (non-standard) "loaded".
    startApp()
  } else {
    // The document is not ready yet, so wait for the DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', startApp, false)
  }
}

/**
 * Updates the parameters used for World ID (e.g. `signal` or `action_id`).
 * @param propsToUpdate
 */
export const update = (propsToUpdate: Partial<AppProps>) => {
  if (!vanillaWidgetLogic.isMounted()) {
    return console.log('Init widget before updating')
  }

  vanillaWidgetLogic.actions.updateParams(propsToUpdate)
}
/**
 * Returns actual world ID props
 */
export const getProps = () => vanillaWidgetLogic.values.params
