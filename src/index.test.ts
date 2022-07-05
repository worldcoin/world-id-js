import { fireEvent, queryAllByTestId } from '@testing-library/preact'
import { resetContext } from 'kea'
import { testUtilsPlugin } from 'kea-test-utils'
import { worldLogic } from 'worldLogic'
import { init, update, enable, isInitialized, isEnabled } from '.'

const SAMPLE_ACTION_ID = '0x330C8452C879506f313D1565702560435b0fee4C' // smart contract's address
const SAMPLE_SIGNAL = '0x0000000000000000000000000000000000000000' // usually end user's wallet address

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
    init('wld-container-test', { action_id: SAMPLE_ACTION_ID, signal: SAMPLE_SIGNAL })

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
    expect(() => init('wld-container-test', { action_id: SAMPLE_ACTION_ID, signal: SAMPLE_SIGNAL })).not.toThrow()

    expect(() => init('wld-container-test', { action_id: SAMPLE_ACTION_ID, signal: SAMPLE_SIGNAL })).toThrow(
      'World ID is already initialized. To update properties, please use `worldID.update` instead.'
    )
  })
})

describe('parameter validation', () => {
  it('validates action_id is non-empty', () => {
    expect(() => init('wld-container-test', { action_id: '' })).toThrow('The `action_id` parameter is always required.')
  })

  it('validates externalNullifier is non-empty when updating', () => {
    init('wld-container-test', { action_id: SAMPLE_ACTION_ID })

    expect(() => update({ action_id: '' })).toThrow('The `action_id` parameter is always required.')
  })

  it('validates action_id is non-null', () => {
    // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
    expect(() => init('wld-container-test', { action_id: null })).toThrow(
      'The `action_id` parameter is always required.'
    )

    // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
    expect(() => update({ action_id: null })).toThrow('The `action_id` parameter is always required.')
  })

  it('can be initialized with empty `signal`', () => {
    expect(() => init('wld-container-test', { action_id: SAMPLE_ACTION_ID })).not.toThrow()

    const element = queryAllByTestId(document.body, 'world-id-box')[0]

    if (!element) {
      throw new Error('Element not found.')
    }

    // Element is disabled (because `signal` is not present)
    const elementStyle = window.getComputedStyle(element)
    expect(elementStyle.opacity).toBe('0.5')
    expect(elementStyle.cursor).toBe('not-allowed')
  })

  it('throws error if raw action ID does not look like a hex-encoded hash', () => {
    const invalid_action_ids = ['hello_world', 1, BigInt(8), '0xgggggggggggggggggggggg'] // cspell:disable-line

    for (const action_id of invalid_action_ids) {
      // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
      expect(() => init('wld-container-test', { action_id: action_id, advanced_use_raw_action_id: true })).toThrow(
        'but the action ID you provided does not look to be validly hashed or encoded'
      )

      resetContext({
        plugins: [testUtilsPlugin],
      })
    }
  })

  it('throws error if raw signal does not look like a hex-encoded hash', () => {
    const invalid_signals = ['hello_world', 1, BigInt(8), '0xgggggggggggggggggggggg'] // cspell:disable-line

    for (const signal of invalid_signals) {
      expect(() =>
        // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
        init('wld-container-test', { action_id: SAMPLE_ACTION_ID, signal, advanced_use_raw_signal: true })
      ).toThrow('but the signal you provided does not look to be validly hashed or encoded')

      resetContext({
        plugins: [testUtilsPlugin],
      })
    }
  })

  it('throws error if incorrect element type is passed', () => {
    // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
    expect(() => init(123, { action_id: SAMPLE_ACTION_ID })).toThrow(
      'The passed element parameter does not look like a valid HTML element.'
    )
  })

  it('throws error if element cannot be found on DOM', () => {
    expect(() => init('i_do_not_exist', { action_id: SAMPLE_ACTION_ID })).toThrow(
      'Element to mount World ID not found. Please make sure the element is valid.'
    )
  })
})

describe('activation', () => {
  it('can be enabled', () => {
    expect(() => init('wld-container-test', { action_id: SAMPLE_ACTION_ID, signal: SAMPLE_SIGNAL })).not.toThrow()

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

  it('cannot be activated if `signal` is not present', () => {
    expect(() => init('wld-container-test', { action_id: SAMPLE_ACTION_ID })).not.toThrow()

    expect(() => enable()).toThrow('Please provide the `signal` first using `.update()` or `.init()` as applicable.')
  })
})

describe('remote fonts', () => {
  it('loads remote font by default', () => {
    init('wld-container-test', { action_id: SAMPLE_ACTION_ID })

    const elements = document.getElementsByTagName('link')

    if (!elements) {
      throw new Error('Link element not found.')
    }

    let elementFound = false

    for (const element of elements) {
      if (element.href.includes('https://fonts.googleapis.com/css2?family=Rubik') && element.rel === 'stylesheet') {
        elementFound = true
        break
      }
    }

    expect(elementFound).toBeTruthy()
  })

  it('does not load remote font if disabled', () => {
    init('wld-container-test', { action_id: SAMPLE_ACTION_ID, disable_remote_fonts: true })

    // No external stylesheet is loaded
    const elements = document.getElementsByTagName('link')
    expect(elements).toHaveLength(0)
  })
})

describe('state checks', () => {
  it('isInitialized', () => {
    expect(isInitialized()).toBeFalsy()

    init('wld-container-test', { action_id: SAMPLE_ACTION_ID })

    expect(isInitialized()).toBeTruthy()
  })

  it('isEnabled', () => {
    expect(isEnabled()).toBeFalsy()

    init('wld-container-test', { action_id: SAMPLE_ACTION_ID, signal: SAMPLE_SIGNAL })

    expect(isEnabled()).toBeFalsy()

    expect(() => enable()).not.toThrow()

    expect(isEnabled()).toBeTruthy()
  })
})
