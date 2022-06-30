import { MainModal } from './MainModal'
import { render, cleanup } from '@testing-library/preact'
import { Provider } from 'kea'
import { worldLogic } from 'worldLogic'

beforeEach(() => {
  worldLogic.mount()
})

describe('ConnectModal', () => {
  // Render should be used with clean up
  afterEach(cleanup)

  it('renders well', () => {
    // Trigger modal activation
    worldLogic.actions.activate()

    const { queryAllByTestId } = render(
      <Provider>
        <MainModal />
      </Provider>
    )

    const element = queryAllByTestId('overlay')[0]

    // Element exist
    expect(element).toBeTruthy()

    // Styles check. See @testing-library/jest-dom helpers
    expect(element).toHaveStyle('z-index: 5000')

    // Element visible from
    expect(element).toBeVisible()
  })
})
