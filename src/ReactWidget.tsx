import { AppProps } from 'types'
import worldId from 'index'
import { validateInputParams } from 'utils'
import { useEffect, useRef, useState } from 'preact/hooks'
import styled from 'styled-components'
import { H3, P } from 'components/text'

export function ReactWidget(
  props: AppProps & { className?: string; onSuccess?: () => void; onError?: () => void }
): JSX.Element {
  const ErrorHeading = styled(H3)`
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  `

  const ErrorMessage = styled(P)`
    font-size: 12px;
    text-align: center;
  `

  const widgetReference = useRef<HTMLDivElement | null>(null)
  const [validation, setValidation] = useState<ReturnType<typeof validateInputParams>>({ valid: false })

  function activateWorldId() {
    worldId
      .enable()
      .then((result) => {
        console.log('Verified successfully:', result)

        if (props.onSuccess) {
          props.onSuccess()
        }
      })
      .catch((failure) => {
        console.warn('Verification failed:', failure)

        if (props.onError) {
          return props.onError()
        }

        activateWorldId() // Re-activate so the user can try again in case onError wasn't passed
      })
  }

  useEffect(() => {
    setValidation(validateInputParams(props))

    if (!validation.valid || !widgetReference.current || worldId.isEnabled()) {
      return
    }

    worldId.init(widgetReference.current, {
      enable_telemetry: props.enable_telemetry || false,
      action_id: props.action_id,
      signal: props.signal,
      app_name: props.app_name,
      signal_description: props.signal_description,
      theme: props.theme,
    })

    // REVIEW should we use isInitialized to enable worldID?
    if (worldId.isInitialized()) {
      activateWorldId()
    }
  }, [props, validation])

  return (
    <div className={props.className}>
      {validation.valid && <div ref={widgetReference} />}

      {!validation.valid && (
        <div>
          <ErrorHeading>Error while props validation</ErrorHeading>
          {validation.error && <ErrorMessage>{validation.error}</ErrorMessage>}
        </div>
      )}
    </div>
  )
}
