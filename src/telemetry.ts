import { createInternalPostHogInstance } from 'posthog-js-lite'
import { ErrorCodes } from 'types'

// Set at build time
declare const worldIdJSVersion: string

const posthogFetchError = { name: 'posthog-error' }

window.onunhandledrejection = function (event) {
  return event.reason !== posthogFetchError
}

async function posthogFetch(input: RequestInfo, init?: RequestInit) {
  try {
    return await window.fetch(input, init)
  } catch (error) {
    throw posthogFetchError
  }
}

const posthog = createInternalPostHogInstance(
  'phc_QttqgDbMQDYHX1EMH7FnT6ECBVzdp0kGUq92aQaVQ6I',
  { fetch: posthogFetch },
  globalThis
)

// Attributes sent on all events
const SUPER_PROPS = { version: worldIdJSVersion, package: 'world-id-js' }

export const initTelemetry = (enableTelemetry?: boolean): void => {
  if (enableTelemetry) {
    posthog.capture('wid loaded', SUPER_PROPS)
  } else {
    posthog.optOut()
  }
}

export const telemetryVerificationLaunched = (): void => {
  posthog.capture('wid opened', SUPER_PROPS)
}

export const telemetryConnectionEstablished = (leadTimeSeconds?: number): void => {
  posthog.capture('wid connection established', { lead_time_seconds: leadTimeSeconds, ...SUPER_PROPS })
}

export const telemetryVerificationSuccess = (): void => {
  posthog.capture('wid verification success', SUPER_PROPS)
}

export const telemetryVerificationFailed = (errorCode: ErrorCodes): void => {
  posthog.capture('wid verification failed', { error_code: errorCode, ...SUPER_PROPS })
}

export const telemetryException = (exception: unknown, stackTrace: unknown): void => {
  posthog.capture('$exception', { exception: exception, stack_trace: stackTrace, ...SUPER_PROPS })
}
