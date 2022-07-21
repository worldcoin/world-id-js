import { fireEvent, queryAllByTestId, getByTestId, waitFor, act } from '@testing-library/react'
import { resetContext } from 'kea'
import { testUtilsPlugin } from 'kea-test-utils'
import { init, update } from 'vanilla'
import { widgetLogic } from 'logic/widgetLogic'

const SAMPLE_ACTION_ID = '0x330C8452C879506f313D1565702560435b0fee4C' // smart contract's address
const SAMPLE_SIGNAL = '0x0000000000000000000000000000000000000000' // usually end user's wallet address

// FIXME update tests

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
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

beforeAll(() => {
  const div = document.createElement('div')
  div.setAttribute('id', 'wld-container-test')
  document.body.appendChild(div)
})

describe('initialization', () => {
  // it('can be initialized', async () => {
  //   await act(() => {
  //     init('wld-container-test', {
  //       connectionProps: {
  //         action_id: SAMPLE_ACTION_ID,
  //         signal: SAMPLE_SIGNAL,
  //         onVerificationError: () => null,
  //         onVerificationSuccess: () => null,
  //       },
  //     })
  //   })
  //
  //   const element = queryAllByTestId(document.body, 'world-id-box')[0]
  //
  //   if (!element) {
  //     throw new Error('Element not found.')
  //   }
  //
  //   // Element is disabled
  //   //const elementStyle = window.getComputedStyle(element)
  //   //expect(elementStyle.opacity).toBe('0.5')
  //   //expect(elementStyle.cursor).toBe('not-allowed')
  //
  //   // Click does not trigger anything
  //   //fireEvent.click(element)
  //   //const overlay = queryAllByTestId(document.body, 'overlay')[0]
  //   //expect(overlay).not.toBeVisible()
  // })
  it('cannot be initialized twice', () => {
    const onInitError = jest.fn()
    init('wld-container-test', {
      onInitError,
      connectionProps: {
        action_id: SAMPLE_ACTION_ID,
        signal: SAMPLE_SIGNAL,
        onVerificationError: () => null,
        onVerificationSuccess: () => null,
      },
    })
    expect(onInitError).not.toBeCalled()

    const onInitError1 = jest.fn()
    init('wld-container-test', {
      onInitError: onInitError1,
      connectionProps: {
        action_id: SAMPLE_ACTION_ID,
        signal: SAMPLE_SIGNAL,
        onVerificationError: () => null,
        onVerificationSuccess: () => null,
      },
    })
    expect(onInitError1).toBeCalledWith({
      error: {
        message: 'World ID is already initialized. To update properties, please use `worldID.update` instead.',
      },
    })
  })
})

describe('parameter validation', () => {
  it('validates action_id is non-empty', () => {
    const onInitError = jest.fn()
    init('wld-container-test', {
      onInitError,
      connectionProps: {
        action_id: '',
        onVerificationError: () => null,
        onVerificationSuccess: () => null,
      },
    })
    expect(onInitError).toBeCalledWith({
      error: {
        message: 'The `action_id` parameter is always required.',
      },
    })
  })
  it('validates action_id is non-empty when updating', () => {
    init('wld-container-test', {
      connectionProps: {
        action_id: SAMPLE_ACTION_ID,
        onVerificationError: () => null,
        onVerificationSuccess: () => null,
      },
    })
    expect(() =>
      update({ connectionProps: { action_id: '', onVerificationError: () => null, onVerificationSuccess: () => null } })
    ).toThrow('The `action_id` parameter is always required.')
  })
  it('validates action_id is non-null', () => {
    const onInitError = jest.fn()
    init('wld-container-test', {
      onInitError,
      connectionProps: {
        // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
        action_id: null,
        onVerificationError: () => null,
        onVerificationSuccess: () => null,
      },
    })
    expect(onInitError).toBeCalledWith({
      error: {
        message: 'The `action_id` parameter is always required.',
      },
    })
  })
  it('validates action_id is non-null when updating', () => {
    init('wld-container-test', {
      connectionProps: {
        action_id: SAMPLE_ACTION_ID,
        onVerificationError: () => null,
        onVerificationSuccess: () => null,
      },
    })
    expect(() =>
      update({
        connectionProps: {
          // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
          action_id: null,
          onVerificationError: () => null,
          onVerificationSuccess: () => null,
        },
      })
    ).toThrow('The `action_id` parameter is always required.')
  })
  // it('can be initialized with empty `signal`', () => {
  //   expect(() =>
  //     init('wld-container-test', {
  //       connectionProps: {
  //         action_id: SAMPLE_ACTION_ID,
  //         onVerificationError: () => null,
  //         onVerificationSuccess: () => null,
  //       },
  //     })
  //   ).not.toThrow()
  //
  //   const element = queryAllByTestId(document.body, 'world-id-box')[0]
  //
  //   if (!element) {
  //     throw new Error('Element not found.')
  //   }
  //
  //   // Element is disabled (because `signal` is not present)
  //   const elementStyle = window.getComputedStyle(element)
  //   expect(elementStyle.opacity).toBe('0.5')
  //   expect(elementStyle.cursor).toBe('not-allowed')
  // })
  // it('throws error if raw action ID does not look like a hex-encoded hash', () => {
  //   const invalid_action_ids = ['hello_world', 1, BigInt(8), '0xgggggggggggggggggggggg'] // cspell:disable-line
  //
  //   for (const action_id of invalid_action_ids) {
  //     // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
  //     expect(() => init('wld-container-test', { action_id: action_id, advanced_use_raw_action_id: true })).toThrow(
  //       'but the action ID you provided does not look to be validly hashed or encoded'
  //     )
  //
  //     resetContext({
  //       plugins: [testUtilsPlugin],
  //     })
  //   }
  // })
  // it('throws error if raw signal does not look like a hex-encoded hash', () => {
  //   const invalid_signals = ['hello_world', 1, BigInt(8), '0xgggggggggggggggggggggg'] // cspell:disable-line
  //
  //   for (const signal of invalid_signals) {
  //     expect(() =>
  //       // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
  //       init('wld-container-test', { action_id: SAMPLE_ACTION_ID, signal, advanced_use_raw_signal: true })
  //     ).toThrow('but the signal you provided does not look to be validly hashed or encoded')
  //
  //     resetContext({
  //       plugins: [testUtilsPlugin],
  //     })
  //   }
  // })
  // it('throws error if incorrect element type is passed', () => {
  //   // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
  //   expect(() => init(123, { action_id: SAMPLE_ACTION_ID })).toThrow(
  //     'The passed element parameter does not look like a valid HTML element.'
  //   )
  // })
  // it('throws error if element cannot be found on DOM', () => {
  //   expect(() =>
  //     init('i_do_not_exist', {
  //       connectionProps: {
  //         action_id: SAMPLE_ACTION_ID,
  //         onVerificationError: () => null,
  //         onVerificationSuccess: () => null,
  //       },
  //     })
  //   ).toThrow('Element to mount World ID not found. Please make sure the element is valid.')
  // })
})

describe('activation', () => {
  // it('can be enabled', async () => {
  //
  //   await act(() => {
  //     init('wld-container-test', {
  //       connectionProps: {
  //         action_id: SAMPLE_ACTION_ID,
  //         signal: SAMPLE_SIGNAL,
  //         onVerificationError: () => null,
  //         onVerificationSuccess: () => null,
  //       },
  //     })
  //   })
  //
  //   await waitFor(() => expect(getByTestId(document.body, 'world-id-box')).toBeInTheDocument())
  //
  //   //expect(() =>
  //   //  init('wld-container-test', {
  //   //    connectionProps: {
  //   //      action_id: SAMPLE_ACTION_ID,
  //   //      signal: SAMPLE_SIGNAL,
  //   //      onVerificationError: () => null,
  //   //      onVerificationSuccess: () => null,
  //   //    },
  //   //  })
  //   //).not.toThrow()
  //
  //   const element = queryAllByTestId(document.body, 'world-id-box')[0]
  //
  //   if (!element) {
  //     throw new Error('Element not found.')
  //   }
  //
  //   // Element is disabled
  //   const elementStyle = window.getComputedStyle(element)
  //   expect(elementStyle.opacity).toBe('0.6')
  //
  //   expect(widgetLogic.values.isWidgetAvailable).toBeTruthy()
  // })

  // it('cannot be activated before init', () => {
  //   expect(() => enable()).toThrow(
  //     'World ID cannot be enabled before calling `.init()` or before the DOM is loaded. Please make sure you have called `.init()` and your DOM is ready.'
  //   )
  // })
  // it('cannot be updated before init', () => {
  //   expect(() => update({ theme: 'dark' })).toThrow(
  //     'World ID cannot be enabled before calling `.init()` or before the DOM is loaded. Please make sure you have called `.init()` and your DOM is ready.'
  //   )
  // })

  //it('cannot be activated if `signal` is not present', () => {
  //  expect(() =>
  //    init('wld-container-test', {
  //      connectionProps: {
  //        action_id: SAMPLE_ACTION_ID,
  //        onVerificationError: () => null,
  //        onVerificationSuccess: () => null,
  //      },
  //    })
  //  ).not.toThrow()
  //  // expect(() => enable()).toThrow('Please provide the `signal` first using `.update()` or `.init()` as applicable.')
  //})
})
//REVIEW now fonts links with stitches in Widget component
// describe('remote fonts', () => {
//   it('loads remote font by default', () => {
//     init('wld-container-test', { action_id: SAMPLE_ACTION_ID })

//     const elements = document.getElementsByTagName('link')

//     if (!elements) {
//       throw new Error('Link element not found.')
//     }

//     let elementFound = false

//     for (const element of elements) {
//       if (element.href.includes('https://fonts.googleapis.com/css2?family=Rubik') && element.rel === 'stylesheet') {
//         elementFound = true
//         break
//       }
//     }

//     expect(elementFound).toBeTruthy()
//   })

// it('does not load remote font if disabled', () => {
//   init('wld-container-test', {
//     connectionProps: {
//       action_id: SAMPLE_ACTION_ID,
//       signal: SAMPLE_SIGNAL,
//       onVerificationError: () => null,
//       onVerificationSuccess: () => null,
//     },
//     disableRemoteFonts: true,
//   })

//   // No external stylesheet is loaded
//   const elements = document.getElementsByTagName('link')
//   expect(elements).toHaveLength(0)
// })
// })

// describe('state checks', () => {
//   it('isInitialized', () => {
//     expect(isInitialized()).toBeFalsy()

//     init('wld-container-test', { action_id: SAMPLE_ACTION_ID })

//     expect(isInitialized()).toBeTruthy()
//   })

//   it('isEnabled', () => {
//     expect(isEnabled()).toBeFalsy()

//     init('wld-container-test', { action_id: SAMPLE_ACTION_ID, signal: SAMPLE_SIGNAL })

//     expect(isEnabled()).toBeFalsy()

//     expect(() => enable()).not.toThrow()

//     expect(isEnabled()).toBeTruthy()
//   })
// })
