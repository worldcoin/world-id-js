import styled, { CSSProperties } from 'styled-components'

const SLinkButton = styled.button`
  outline: 0;
  border: 0;
  color: white;
  cursor: pointer;
  background: 0;
  color: var(--primary);
  transition: background-color 0.2s ease-in-out;
  padding: 0;
  margin: 0;
  font-size: 1em;
  display: flex;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

interface LinkButtonInterface {
  style?: CSSProperties
  disabled?: boolean
  onClick?: () => void
  children?: string | JSX.Element | JSX.Element[]
}

export function LinkButton(props: LinkButtonInterface) {
  return <SLinkButton {...props} />
}
