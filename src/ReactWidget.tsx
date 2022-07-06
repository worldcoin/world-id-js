import { AppProps } from 'types'
import worldId from 'index'
import { validateInputParams } from 'utils'
import { useEffect, useRef } from 'react'

type Props = AppProps & {
  className?: string
  onSuccess?: () => void
  onError?: () => void
  enabled?: boolean
  debug?: boolean
}

const additionalPropsKeys = ['className', 'onSuccess', 'onError', 'enabled', 'debug'] as const
type AppPropsKeys = keyof AppProps

export function ReactWidget(props: Props): JSX.Element {
  const widgetReference = useRef<HTMLDivElement | null>(null)
  const validation = validateInputParams(props)
  const prevAppProps = useRef<AppProps | null>(null)

  const getAppProps = (currentProps: Props) => {
    const propsKeys = Object.keys(currentProps) as Array<keyof Props>

    return propsKeys.reduce(
      (accumulator: AppProps, currentValue) => {
        if (additionalPropsKeys.some((key) => key === currentValue)) {
          return accumulator
        }

        return {
          ...accumulator,
          [currentValue as AppPropsKeys]: props[currentValue],
        }
      },
      { action_id: '' }
    )
  }

  const getChangedAppProps = (appProps: AppProps) => {
    if (!prevAppProps.current) {
      return null
    }

    if (JSON.stringify(appProps) === JSON.stringify(prevAppProps.current)) {
      return null
    }

    const appPropsKeys = Object.keys(appProps) as Array<AppPropsKeys>

    return appPropsKeys.reduce((accumulator: { [K in AppPropsKeys]?: AppProps[K] }, currentValue) => {
      if (prevAppProps.current?.[currentValue] && prevAppProps.current?.[currentValue] === appProps[currentValue]) {
        return accumulator
      }

      return {
        ...accumulator,
        [currentValue]: appProps[currentValue],
      }
    }, {})
  }

  function activateWorldId() {
    worldId
      .enable()
      .then((result) => {
        if (props.debug) {
          console.log('Verified successfully:', result)
        }

        if (props.onSuccess) {
          props.onSuccess()
        }
      })
      .catch((failure) => {
        if (props.debug) {
          console.warn('Verification failed:', failure)
        }

        if (props.onError) {
          return props.onError()
        }

        activateWorldId() // Re-activate so the user can try again in case onError wasn't passed
      })
  }

  useEffect(() => {
    if (!widgetReference.current) {
      return
    }

    if (!validation.valid && props.debug) {
      console.log('Props validation error: ', validation)
    }

    if (!worldId.isInitialized()) {
      worldId.init(widgetReference.current, {
        enable_telemetry: props.enable_telemetry || false,
        action_id: props.action_id,
        signal: props.signal,
        app_name: props.app_name,
        signal_description: props.signal_description,
        theme: props.theme,
      })
    }

    const appProps = getAppProps(props)
    const changedProps = getChangedAppProps(appProps)
    prevAppProps.current = appProps

    if (worldId.isInitialized() && changedProps) {
      worldId.update({
        ...changedProps,
      })
    }

    if (worldId.isInitialized() && !worldId.isEnabled() && props.enabled) {
      activateWorldId()
    }
  }, [props, validation])

  return <div className={props.className}>{validation.valid && <div ref={widgetReference} />}</div>
}
