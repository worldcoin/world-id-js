import styled from 'styled-components'
import { GlobalStyles } from './styles'
import { WorldIDBox } from 'components/WorldIDBox'
import { MainModal } from 'components/MainModal'
import { useEffect, useErrorBoundary } from 'preact/hooks'
import { telemetryException } from 'telemetry'
import { useValues } from 'kea'
import { worldLogic } from 'worldLogic'

const Wrapper = styled.div`
  max-width: 100%;
  width: 300px;
`

export function App(): JSX.Element {
  const [error, resetError] = useErrorBoundary()
  const { theme } = useValues(worldLogic)

  useEffect(() => {
    if (error) {
      telemetryException(error.toString(), error.stack)
      resetError()
    }
  }, [error])

  return (
    <GlobalStyles isDark={theme === 'dark'}>
      <Wrapper>
        <WorldIDBox />
        <MainModal />
      </Wrapper>
    </GlobalStyles>
  )
}
