import { useValues } from 'kea'
import { createRoot } from 'react-dom/client'
import { AppProps } from 'types/app-props'
import { vanillaWidgetLogic } from './logic/vanillaWidgetLogic'
import { Widget } from './Widget'

const VanillaWidget = (): JSX.Element => {
  const { params } = useValues(vanillaWidgetLogic)

  return <Widget {...params} />
}

export * as utils from 'utils'
let isInitialized = false

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
    } else {
      if (props.onInitError) {
        const message = 'World ID is already initialized. To update properties, please use `worldID.update` instead.'
        props.onInitError({ error: { message } })
        return
      }
    }

    if (!mountNode) {
      const errorMessage = 'Element to mount World ID not found. Please make sure the element is valid.'
      if (props.onInitError) {
        props.onInitError({ error: { message: errorMessage } })
        return
      }
    }

    if (!(mountNode instanceof HTMLElement)) {
      const errorMessage = 'The passed element parameter does not look like a valid HTML element.'
      if (props.onInitError) {
        props.onInitError({ error: { message: errorMessage } })
        return
      }
    }

    if (!props.connectionProps.action_id) {
      if (props.onInitError) {
        const message = 'The `action_id` parameter is always required.'
        props.onInitError({ error: { message } })
        return
      }
    }

    try {
      vanillaWidgetLogic.actions.updateParams(props)
    } catch (error) {
      console.error('Error while updating props', error)
    }

    try {
      if (!isInitialized) {
        const root = createRoot(mountNode as Element)
        root.render(<VanillaWidget />)
      }
      isInitialized = true
    } catch (error) {
      console.error('Error while rendering Widget', error)
    }

    if (props.onInitSuccess) {
      props.onInitSuccess()
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
