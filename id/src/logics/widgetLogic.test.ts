import { resetContext } from 'kea'
import { expectLogic, testUtilsPlugin } from 'kea-test-utils'
import { widgetLogic } from './widgetLogic'

beforeEach(() => {
  resetContext({
    plugins: [testUtilsPlugin],
  })
})

describe('widgetLogic', () => {
  test('runs afterMount events', async () => {
    widgetLogic.mount()
    await expectLogic(widgetLogic).toMatchValues({ isDebug: false })
  })

  test('debug mode is exposed properly', async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const logic = widgetLogic({ action_id: 'wld_staging_12345678', on_success: () => {}, debug: true })
    logic.mount()
    await expectLogic(widgetLogic).toMatchValues({ isDebug: true })
  })

  test('initializes widget when `action_id` is passed', async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const logic = widgetLogic({ action_id: 'wld_staging_12345678', on_success: () => {}, on_error: () => {} })
    logic.mount()
    await expectLogic(logic).toFinishAllListeners().toMatchValues({ isWidgetInitialized: true, isWidgetEnabled: false })
  })

  test('validates `action_id` is not empty', async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const logic = widgetLogic({ action_id: '', on_success: () => {}, on_error: () => {} })
    logic.mount()
    await expectLogic(logic)
      .toFinishAllListeners()
      .toMatchValues({ isWidgetInitialized: false, isWidgetEnabled: false })
  })

  test('initializes and enables widget when params are passed', async () => {
    const logic = widgetLogic({
      action_id: 'wld_staging_12345678',
      signal: 'mySignal',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      on_success: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      on_error: () => {},
    })
    logic.mount()
    await expectLogic(logic).toFinishAllListeners().toMatchValues({ isWidgetInitialized: true, isWidgetEnabled: true })
  })
})
