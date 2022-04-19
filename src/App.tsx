import styled from 'styled-components'
import { GlobalStyles } from './styles'
import { WorldIDBox } from 'components/WorldIDBox'
import { MainModal } from 'components/MainModal'
import { resetContext, Provider } from 'kea'
import { useEffect, useErrorBoundary } from 'preact/hooks'
import { telemetryException } from 'telemetry'

const Wrapper = styled.div`
  max-width: 100%;
  width: 300px;
`

resetContext({
  createStore: {},
  plugins: [],
})

export function App(): JSX.Element {
  const [error, resetError] = useErrorBoundary()

  useEffect(() => {
    if (error) {
      telemetryException(error.toString(), error.stack)
      resetError()
    }
  }, [error])

  return (
    <Provider>
      <GlobalStyles>
        <Wrapper>
          <WorldIDBox />
          <MainModal />
        </Wrapper>
      </GlobalStyles>
    </Provider>
  )
}
