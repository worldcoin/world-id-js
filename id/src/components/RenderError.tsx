import styled from 'styled-components'
import { GlobalStyles } from 'styles'

const SRenderError = styled.div`
  color: var(--danger);
  border: 1px solid var(--danger);
  background-color: #ffeae5;
  border-radius: 100px;
  height: 56px;
  width: 100%;
  max-width: 250px;
  min-width: 250px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
`

export function RenderError(): JSX.Element {
  return (
    <GlobalStyles>
      <SRenderError>Cannot render World ID. Please check the console for details.</SRenderError>
    </GlobalStyles>
  )
}
