import { fireEvent, queryAllByTestId } from '@testing-library/preact'
import { resetContext } from 'kea'
import { testUtilsPlugin } from 'kea-test-utils'
import { worldLogic } from 'worldLogic'
import { init, update, enable, isInitialized, isEnabled } from '.'

const VALID_ABI = '0x0000000000000000000000000000000000000000000000000000000000000000'

beforeEach(() => {
  resetContext({
    plugins: [testUtilsPlugin],
  })

  // Clear font stylesheet
  for (const element of document.getElementsByTagName('link')) {
    element.remove()
  }
})

beforeAll(() => {
  const div = document.createElement('div')
  div.setAttribute('id', 'wld-container-test')
  document.body.appendChild(div)
})

describe('initialization', () => {
  it('can be initialized', () => {
    init('wld-container-test', { externalNullifier: VALID_ABI, proofSignal: VALID_ABI })

    const element = queryAllByTestId(document.body, 'world-id-box')[0]

    if (!element) {
      throw new Error('Element not found.')
    }

    // Element is disabled
    const elementStyle = window.getComputedStyle(element)
    expect(elementStyle.opacity).toBe('0.5')
    expect(elementStyle.cursor).toBe('not-allowed')

    // Click does not trigger anything
    fireEvent.click(element)
    const overlay = queryAllByTestId(document.body, 'overlay')[0]
    expect(overlay).not.toBeVisible()
  })

  it('cannot be initialized twice', () => {
    expect(() => init('wld-container-test', { externalNullifier: VALID_ABI, proofSignal: VALID_ABI })).not.toThrow()

    expect(() => init('wld-container-test', { externalNullifier: VALID_ABI, proofSignal: VALID_ABI })).toThrow(
      'World ID is already initialized. To update properties, please use `worldID.update` instead.'
    )
  })
})

describe('parameter validation', () => {
  it('validates externalNullifier is non-empty', () => {
    expect(() => init('wld-container-test', { externalNullifier: '' })).toThrow(
      'The `externalNullifier` parameter is always required.'
    )
  })

  it('validates externalNullifier is non-empty when updating', () => {
    init('wld-container-test', { externalNullifier: VALID_ABI })

    expect(() => update({ externalNullifier: '' })).toThrow('The `externalNullifier` parameter is always required.')
  })

  it('validates externalNullifier is non-null', () => {
    // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
    expect(() => init('wld-container-test', { externalNullifier: null })).toThrow(
      'The `externalNullifier` parameter is always required.'
    )

    // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
    expect(() => update({ externalNullifier: null })).toThrow('The `externalNullifier` parameter is always required.')
  })

  it('can be initialized with empty `proofSignal`', () => {
    expect(() => init('wld-container-test', { externalNullifier: VALID_ABI })).not.toThrow()

    const element = queryAllByTestId(document.body, 'world-id-box')[0]

    if (!element) {
      throw new Error('Element not found.')
    }

    // Element is disabled (because `proofSignal` is not present)
    const elementStyle = window.getComputedStyle(element)
    expect(elementStyle.opacity).toBe('0.5')
    expect(elementStyle.cursor).toBe('not-allowed')
  })

  it('validates `proofSignal` if present', () => {
    expect(() => init('wld-container-test', { externalNullifier: VALID_ABI, proofSignal: 'invalid' })).toThrow(
      'The `proofSignal` you provided does not look valid. This parameter should be an ABI-encoded string.'
    )
  })

  it('validates `proofSignal` on update', () => {
    init('wld-container-test', { externalNullifier: VALID_ABI })

    expect(() => update({ proofSignal: '0xinvalid' })).toThrow(
      'The `proofSignal` you provided does not look valid. This parameter should be an ABI-encoded string.'
    )
  })

  it('throws error if incorrect element type is passed', () => {
    // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
    expect(() => init(123, { externalNullifier: VALID_ABI })).toThrow(
      'The passed element parameter does not look like a valid HTML element.'
    )
  })

  it('throws error if element cannot be found on DOM', () => {
    expect(() => init('i_dont_exist', { externalNullifier: VALID_ABI })).toThrow(
      'Element to mount World ID not found. Please make sure the element is valid.'
    )
  })
})

describe('activation', () => {
  it('can be activated', () => {
    expect(() => init('wld-container-test', { externalNullifier: VALID_ABI, proofSignal: VALID_ABI })).not.toThrow()

    const element = queryAllByTestId(document.body, 'world-id-box')[0]

    if (!element) {
      throw new Error('Element not found.')
    }

    // Element is disabled
    const elementStyle = window.getComputedStyle(element)
    expect(elementStyle.opacity).toBe('0.5')

    expect(() => enable()).not.toThrow()

    expect(worldLogic.values.isAppEnabled).toBeTruthy()
  })

  it('cannot be activated before init', () => {
    expect(() => enable()).toThrow(
      'World ID cannot be enabled before calling `.init()` or before the DOM is loaded. Please make sure you have called `.init()` and your DOM is ready.'
    )
  })

  it('cannot be activated if `proofSignal` is not present', () => {
    expect(() => init('wld-container-test', { externalNullifier: VALID_ABI })).not.toThrow()

    expect(() => enable()).toThrow(
      'Please provide the `proofSignal` first using `.update()` or `.init()` as applicable.'
    )
  })
})

describe('remote fonts', () => {
  it('loads remote font by default', () => {
    init('wld-container-test', { externalNullifier: VALID_ABI })

    const elements = document.getElementsByTagName('link')

    if (!elements) {
      throw new Error('Link element not found.')
    }

    let elementFound = false

    for (const element of elements) {
      if (element.href.includes('https://fonts.googleapis.com/css2?family=Inter') && element.rel === 'stylesheet') {
        elementFound = true
        break
      }
    }

    expect(elementFound).toBeTruthy()
  })

  it('does not load remote font if disabled', () => {
    init('wld-container-test', { externalNullifier: VALID_ABI, disableRemoteFonts: true })

    // No external stylesheet is loaded
    const elements = document.getElementsByTagName('link')
    expect(elements).toHaveLength(0)
  })
})

describe('state checks', () => {
  it('isInitialized', () => {
    expect(isInitialized()).toBeFalsy()

    init('wld-container-test', { externalNullifier: VALID_ABI })

    expect(isInitialized()).toBeTruthy()
  })

  it('isEnabled', () => {
    expect(isEnabled()).toBeFalsy()

    init('wld-container-test', { externalNullifier: VALID_ABI, proofSignal: VALID_ABI })

    expect(isEnabled()).toBeFalsy()

    expect(() => enable()).not.toThrow()

    expect(isEnabled()).toBeTruthy()
  })
})
