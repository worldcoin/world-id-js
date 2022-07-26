import { useValues } from 'kea'
import { createRoot } from 'react-dom/client'
import { AppProps } from 'types'
import { vanillaWidgetLogic } from './logic/vanillaWidgetLogic'
import { Widget } from './Widget'

// Make utils available on the JS vanilla version
export * as utils from 'utils'

const VanillaWidget = (): JSX.Element => {
  const { params } = useValues(vanillaWidgetLogic)

  return <Widget {...params} />
}

const handleInitError = (errorMessage: string, props: AppProps): void => {
  console.error(errorMessage)
  if (props.on_init_error) {
    props.on_init_error(errorMessage)
  }
}

/**
 * Initializes World ID, will render the World ID box on the provided element. The box will be
 * disabled until `.activate()` is called.
 * @param elementInput ID of HTML element or DOM node to mount World ID on
 * @param props See `AppProps` for details
 */
export const init = (elementInput: string | Element | DocumentFragment, props: AppProps): void => {
  const mountNode = typeof elementInput === 'string' ? document.getElementById(elementInput) : elementInput

  const startApp = () => {
    if (!vanillaWidgetLogic.isMounted()) {
      vanillaWidgetLogic.mount()
    }

    if (!mountNode) {
      handleInitError('Element to mount World ID not found. Please make sure the element is valid.', props)
    }

    if (!(mountNode instanceof HTMLElement)) {
      handleInitError('The passed element parameter does not look like a valid HTML element.', props)
    }

    vanillaWidgetLogic.actions.updateParams(props)

    try {
      const root = createRoot(mountNode as Element)
      root.render(<VanillaWidget />)
    } catch (error) {
      console.log(error)
      handleInitError('Error while rendering Widget component at node', props)
    }

    if (props.on_init_success) {
      props.on_init_success()
    }
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
 * Returns actual World ID props
 */
export const getProps = () => vanillaWidgetLogic.values.params
