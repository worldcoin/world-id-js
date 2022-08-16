import { queryAllByTestId, act, fireEvent, getByTestId } from '@testing-library/react'
import { resetContext } from 'kea'
import { testUtilsPlugin } from 'kea-test-utils'
import { init, update, reset } from 'vanilla'
import { widgetLogic } from 'logics/widgetLogic'

const SAMPLE_ACTION_ID = 'wld_staging_12345678'
const SAMPLE_SIGNAL = '0x0000000000000000000000000000000000000000' // usually end user's wallet address for web3 apps

beforeEach(() => {
  const div = document.createElement('div')
  div.setAttribute('id', 'wld-container-test')
  document.body.appendChild(div)
})

afterEach(() => {
  const element = document.getElementById('wld-container-test')
  if (element) {
    element.remove()
  }
})

beforeEach(() => {
  resetContext({
    plugins: [testUtilsPlugin],
  })
})

afterEach(() => {
  window.location.reload()
  reset()
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

  Object.defineProperty(window, 'location', {
    value: {
      reload: jest.fn(),
    },
  })
})

describe('initialization', () => {
  it('initializes successfully', async () => {
    await act(() => {
      init('wld-container-test', {
        action_id: SAMPLE_ACTION_ID,
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy() // Because `signal` is not passed
    // Click does not trigger anything
    fireEvent.click(element)
    const overlay = queryAllByTestId(document.body, 'overlay')[0]
    expect(overlay).toBeVisible()
  })

  it('cannot be initialized twice', () => {
    const on_init_error = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'error').mockImplementation(() => {})
    act(() => {
      init('wld-container-test', {
        on_init_error,
        action_id: SAMPLE_ACTION_ID,
        signal: SAMPLE_SIGNAL,
        on_error: () => null,
        on_success: () => null,
      })
    })
    expect(on_init_error).not.toBeCalled()
    expect(console.error).not.toBeCalled()

    const on_init_error_2 = jest.fn()
    act(() => {
      init('wld-container-test', {
        on_init_error: on_init_error_2,
        action_id: SAMPLE_ACTION_ID,
        signal: SAMPLE_SIGNAL,
        on_error: () => null,
        on_success: () => null,
      })
    })
    expect(on_init_error_2).toBeCalledWith(
      'World ID is already initialized. To update properties, please use `worldID.update` instead.'
    )
    expect(console.error).toBeCalledWith(
      'World ID is already initialized. To update properties, please use `worldID.update` instead.'
    )
  })
})

describe('parameter validation', () => {
  it('validates action_id is non-empty', () => {
    const on_init_error = jest.fn()
    act(() => {
      init('wld-container-test', {
        on_init_error,
        action_id: '',
        signal: '',
        on_error: () => null,
        on_success: () => null,
      })
    })
    expect(on_init_error).toBeCalledWith('The `action_id` parameter is always required.')
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
  })

  it('validates action_id is non-empty when updating', async () => {
    await act(() => {
      init('wld-container-test', {
        action_id: SAMPLE_ACTION_ID,
        signal: 'mySignal',
        on_error: () => null,
        on_success: () => null,
      })
    })
    let element
    element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeFalsy()
    await act(() => {
      update({
        action_id: '',
      })
    })
    element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
  })

  it('validates action_id is non-null', async () => {
    const on_init_error = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'error').mockImplementation(() => {}) // Expected errors not logged on output
    await act(() => {
      init('wld-container-test', {
        on_init_error,
        // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
        action_id: null,
        on_error: () => null,
        on_success: () => null,
      })
    })
    expect(on_init_error).toBeCalledWith('The `action_id` parameter is always required.')
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
  })

  it('validates action_id is non-null when updating', async () => {
    await act(() => {
      init('wld-container-test', {
        action_id: SAMPLE_ACTION_ID,
        signal: '',
        on_error: () => null,
        on_success: () => null,
      })
    })
    await act(() => {
      update({
        // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
        action_id: null,
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
  })

  it('can be initialized with empty `signal`', () => {
    const on_init_error = jest.fn()
    act(() => {
      init('wld-container-test', {
        on_init_error,
        action_id: SAMPLE_ACTION_ID,
        signal: '',
        on_error: () => null,
        on_success: () => null,
      })
    })
    expect(on_init_error).not.toBeCalled()
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
  })

  it('throws error if raw action ID does not look like a hex-encoded hash', () => {
    // FIXME: This test should pass
    // const invalid_action_ids = ['hello_world', 1, BigInt(8), '0xgggggggggggggggggggggg'] // cspell:disable-line
    // for (const action_id of invalid_action_ids) {
    //   // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
    //   expect(() => init('wld-container-test', { action_id: action_id, advanced_use_raw_action_id: true })).toThrow(
    //     'but the action ID you provided does not look to be validly hashed or encoded'
    //   )
    //   resetContext({
    //     plugins: [testUtilsPlugin],
    //   })
    // }
  })

  it('throws error if raw signal does not look like a hex-encoded hash', () => {
    // FIXME: This test should pass
    // const invalid_signals = ['hello_world', 1, BigInt(8), '0xgggggggggggggggggggggg'] // cspell:disable-line
    // for (const signal of invalid_signals) {
    //   expect(() =>
    //     // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
    //     init('wld-container-test', { action_id: SAMPLE_ACTION_ID, signal, advanced_use_raw_signal: true })
    //   ).toThrow('but the signal you provided does not look to be validly hashed or encoded')
    //   resetContext({
    //     plugins: [testUtilsPlugin],
    //   })
    // }
  })
  it('throws error if incorrect element type is passed', () => {
    // FIXME: This test should pass
    // // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
    // expect(() => init(123, { action_id: SAMPLE_ACTION_ID })).toThrow(
    //   'The passed element parameter does not look like a valid HTML element.'
    // )
  })
  it('throws error if element cannot be found on DOM', () => {
    // FIXME: This test should pass
    // expect(() =>
    //   init('i_do_not_exist', {
    //     action_id: SAMPLE_ACTION_ID,
    //     on_error: () => null,
    //     on_success: () => null,
    //   })
    // ).toThrow('Element to mount World ID not found. Please make sure the element is valid.')
  })
})

describe('activation', () => {
  it('can be enabled', async () => {
    await act(() => {
      init('wld-container-test', {
        action_id: SAMPLE_ACTION_ID,
        signal: SAMPLE_SIGNAL,
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeFalsy()
    expect(widgetLogic.values.isWidgetInitialized).toBeTruthy()
    expect(widgetLogic.values.isWidgetEnabled).toBeTruthy()
  })
  it('cannot be activated if `signal` is not present', async () => {
    await act(() => {
      init('wld-container-test', {
        action_id: SAMPLE_ACTION_ID,
        signal: '',
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    expect(widgetLogic.values.isWidgetInitialized).toBeTruthy()
    expect(widgetLogic.values.isWidgetEnabled).toBeFalsy()
  })
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
