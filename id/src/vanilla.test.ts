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

  // console.warn is mocked so we don't output the expected warning message from reset() when running tests
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'warn').mockImplementation(() => {})

  reset()

  jest.clearAllMocks()
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
  it('validates action_id is non-empty', async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const error = jest.spyOn(console, 'error').mockImplementation(() => {}) // Expected errors not logged on output
    const on_init_error = jest.fn()
    await act(() => {
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
    expect(element.textContent).toBe('Widget is unavailable')
    expect(error).toHaveBeenNthCalledWith(1, 'The `action_id` parameter is always required.')
    expect(error).toHaveBeenNthCalledWith(2, 'The `action_id` parameter cannot be empty.')
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
    expect(element.textContent).toBe("I'm a unique person")
    await act(() => {
      update({
        action_id: '',
      })
    })
    element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    expect(element.textContent).toBe('Widget is unavailable')
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
    expect(element.textContent).toBe('Widget is unavailable')
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

  it('unavailable if raw action ID `hello_world` does not look like a hex-encoded hash', async () => {
    await act(() => {
      init('wld-container-test', {
        advanced_use_raw_action_id: true,
        action_id: 'hello_world',
        signal: SAMPLE_SIGNAL,
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    expect(element.textContent).toBe('Widget is unavailable')
  })

  it('unavailable if raw action ID `0xgggggggggggggggggggggg` does not look like a hex-encoded hash', async () => {
    await act(() => {
      init('wld-container-test', {
        advanced_use_raw_action_id: true,
        action_id: '0xgggggggggggggggggggggg',
        signal: SAMPLE_SIGNAL,
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    expect(element.textContent).toBe('Widget is unavailable')
  })

  it('unavailable if raw action ID `1` does not look like a hex-encoded hash', async () => {
    await act(() => {
      init('wld-container-test', {
        advanced_use_raw_action_id: true,
        // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
        action_id: 1,
        signal: SAMPLE_SIGNAL,
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    expect(element.textContent).toBe('Widget is unavailable')
  })

  it('unavailable if raw action ID `BigInt(8)` does not look like a hex-encoded hash', async () => {
    await act(() => {
      init('wld-container-test', {
        advanced_use_raw_action_id: true,
        // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
        action_id: BigInt(8),
        signal: SAMPLE_SIGNAL,
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    expect(element.textContent).toBe('Widget is unavailable')
  })

  it('unavailable if raw signal `hello_world` does not look like a hex-encoded hash', async () => {
    await act(() => {
      init('wld-container-test', {
        advanced_use_raw_signal: true,
        action_id: SAMPLE_ACTION_ID,
        signal: 'hello_world',
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    expect(element.textContent).toBe('Widget is unavailable')
  })

  it('unavailable if raw signal `0xgggggggggggggggggggggg` does not look like a hex-encoded hash', async () => {
    await act(() => {
      init('wld-container-test', {
        advanced_use_raw_signal: true,
        action_id: SAMPLE_ACTION_ID,
        signal: '0xgggggggggggggggggggggg',
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    expect(element.textContent).toBe('Widget is unavailable')
  })

  it('unavailable if raw signal `1` does not look like a hex-encoded hash', async () => {
    await act(() => {
      init('wld-container-test', {
        advanced_use_raw_signal: true,
        action_id: SAMPLE_ACTION_ID,
        // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
        signal: 1,
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    expect(element.textContent).toBe('Widget is unavailable')
  })

  it('unavailable if raw signal `BigInt(8)` does not look like a hex-encoded hash', async () => {
    await act(() => {
      init('wld-container-test', {
        advanced_use_raw_signal: true,
        action_id: SAMPLE_ACTION_ID,
        // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
        signal: BigInt(8),
        on_error: () => null,
        on_success: () => null,
      })
    })
    const element = getByTestId(document.body, 'world-id-box') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    expect(element.textContent).toBe('Widget is unavailable')
  })

  it('throws error if incorrect element type is passed', async () => {
    const on_init_error = jest.fn()
    await act(() => {
      // @ts-expect-error testing invalid parameters passed, we want to bypass TS for this
      init(123, {
        action_id: SAMPLE_ACTION_ID,
        signal: SAMPLE_SIGNAL,
        on_init_error,
        on_error: () => null,
        on_success: () => null,
      })
    })
    expect(on_init_error).toBeCalledWith('The passed element parameter does not look like a valid HTML element.')
  })
  it('throws error if element cannot be found on DOM', async () => {
    const on_init_error = jest.fn()
    await act(() => {
      init('i_do_not_exist', {
        action_id: SAMPLE_ACTION_ID,
        signal: SAMPLE_SIGNAL,
        on_init_error,
        on_error: () => null,
        on_success: () => null,
      })
    })
    expect(on_init_error).toBeCalledWith('Element to mount World ID not found. Please make sure the element is valid.')
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
