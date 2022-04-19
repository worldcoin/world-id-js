import { IconClose } from 'assets/icons'
import styled from 'styled-components'

const SSquareButton = styled.button`
  background-color: white;
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius);
  height: 40px;
  width: 40px;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

interface SquareButtonInterface {
  disabled?: boolean
  onClick: () => void
  icon?: JSX.Element
}

export function SquareButton({ icon = <IconClose />, ...props }: SquareButtonInterface): JSX.Element {
  return <SSquareButton {...props}>{icon}</SSquareButton>
}
