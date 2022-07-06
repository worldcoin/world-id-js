import { App } from 'App'
import { RenderError } from 'components/RenderError'
import { render } from 'react-dom'
import { AppProps, VerificationResponse, CallbackInterface } from 'types'
import { validateInputParams } from 'utils'
import { worldLogic } from 'worldLogic'
import * as utils from 'utils'

// Re-export to make them available externally
export * from 'types'

let mountNode: HTMLElement | null = null

/**
 * Initializes World ID, will render the World ID box on the provided element. The box will be
 * disabled until `.activate()` is called.
 * @param elementInput ID of HTML element or DOM node to mount World ID on
 * @param props See `AppProps` for details
 */
export const init = (elementInput: string | HTMLElement, props: AppProps): void => {
  const logic = worldLogic(props as AppProps)

  const startApp = () => {
    if (!logic.isMounted()) {
      logic.mount()
    } else {
      throw new Error('World ID is already initialized. To update properties, please use `worldID.update` instead.')
    }

    mountNode = typeof elementInput === 'string' ? document.getElementById(elementInput) : elementInput

    validate(props)

    if (!props.disable_remote_fonts) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400&family=Sora:wght@600&display=swap'
      const headElementMatch = document.getElementsByTagName('head')
      if (headElementMatch && headElementMatch[0]) {
        headElementMatch[0].appendChild(link)
      }
    }

    render(<App />, mountNode as HTMLElement) // `mountNode` is already validated not to be `null` on `validate`
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
export const update = (propsToUpdate: Partial<AppProps>): void => {
  const updatedParams = { ...worldLogic.props, ...propsToUpdate }
  validate(updatedParams)
  worldLogic(updatedParams)
}

/**
 * Enables World ID so the end user can go through the flow. Promise is returned with proof results. If the process fails,
 * (e.g. because the user declined the request), an error code will be returned instead.
 * @returns Promise with proof details. Review documentation for details.
 */
export const enable = (): Promise<VerificationResponse> => {
  if (!worldLogic.isMounted()) {
    throw new Error(
      'World ID cannot be enabled before calling `.init()` or before the DOM is loaded. Please make sure you have called `.init()` and your DOM is ready.'
    )
  }
  if (!worldLogic.props.signal) {
    throw new Error('Please provide the `signal` first using `.update()` or `.init()` as applicable.')
  }

  let callbacks = {}
  const promise = new Promise<VerificationResponse>((resolve, reject) => {
    callbacks = {
      successCallback: resolve,
      failureCallback: reject,
    }
  })
  const logic = worldLogic()
  logic.actions.enable(callbacks as CallbackInterface)
  return promise
}

export const isInitialized = (): boolean => {
  return worldLogic.isMounted()
}

export const isEnabled = (): boolean => {
  return worldLogic.isMounted() && worldLogic.values.isAppEnabled
}

const validate = (props: AppProps): void => {
  if (!mountNode) {
    throw new Error('Element to mount World ID not found. Please make sure the element is valid.')
  }

  if (!(mountNode instanceof HTMLElement)) {
    throw new Error('The passed element parameter does not look like a valid HTML element.')
  }

  const { valid, error } = validateInputParams(props)

  if (!valid) {
    render(<RenderError />, mountNode)
    throw error
  }
}

export default { init, update, enable, isEnabled, isInitialized, utils }
