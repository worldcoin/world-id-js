import { useValues } from 'kea'
import { createRoot } from 'react-dom/client'
import { AppProps } from 'types'
import { vanillaWidgetLogic } from './logic/vanillaWidgetLogic'
import { WorldIDWidget } from './WorldIDWidget'

// Make utils available on the JS vanilla version
export * as utils from 'utils'

const VanillaWidget = (): JSX.Element => {
  const {
    params: {
      action_id,
      enable_telemetry,
      app_name,
      signal_description,
      advanced_use_raw_signal,
      advanced_use_raw_action_id,
      disable_remote_fonts,
      on_success,
      on_error,
      on_init_success,
      on_init_error,
      ...restOfParams
    },
  } = useValues(vanillaWidgetLogic)

  return (
    <WorldIDWidget
      actionId={action_id}
      enableTelemetry={enable_telemetry}
      appName={app_name}
      signalDescription={signal_description}
      advancedUseRawSignal={advanced_use_raw_signal}
      advancedUseRawActionId={advanced_use_raw_action_id}
      disableRemoteFonts={disable_remote_fonts}
      onSuccess={on_success}
      onError={on_error}
      onInitSuccess={on_init_success}
      onInitError={on_init_error}
      {...restOfParams}
    />
  )
}

let isInitialized = false

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
    } else {
      handleInitError(
        'World ID is already initialized. To update properties, please use `worldID.update` instead.',
        props
      )
    }

    if (!mountNode) {
      handleInitError('Element to mount World ID not found. Please make sure the element is valid.', props)
    }

    if (!(mountNode instanceof HTMLElement)) {
      handleInitError('The passed element parameter does not look like a valid HTML element.', props)
    }

    if (!props.action_id) {
      handleInitError('The `action_id` parameter is always required.', props)
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
        isInitialized = true
      }
    } catch (error) {
      console.error('Error while rendering Widget', error)
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
    return console.warn('Widget must be initialized before updating.')
  }

  vanillaWidgetLogic.actions.updateParams(propsToUpdate)
}

/**
 * Returns actual World ID props
 */
export const getProps = () => vanillaWidgetLogic.values.params

/**
 * Reset internal state. Useful for unit-testing
 */
export const reset = () => {
  isInitialized = false
}
