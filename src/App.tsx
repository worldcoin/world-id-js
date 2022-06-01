import styled from 'styled-components'
import { GlobalStyles } from './styles'
import { WorldIDBox } from 'components/WorldIDBox'
import { MainModal } from 'components/MainModal'
// import { useEffect } from 'react'
// import { telemetryException } from 'telemetry'

const Wrapper = styled.div`
  max-width: 100%;
  width: 300px;
`

export function App(): JSX.Element {
  // const [error, resetError] = useErrorBoundary()

  // useEffect(() => {
  //   if (error) {
  //     telemetryException(error.toString(), error.stack)
  //     resetError()
  //   }
  // }, [error])

  return (
    <GlobalStyles>
      <Wrapper>
        <WorldIDBox />
        <MainModal />
      </Wrapper>
    </GlobalStyles>
  )
}
