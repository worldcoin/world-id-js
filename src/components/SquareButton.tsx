import { IconClose } from 'assets/icons'
import styled from 'styled-components'
import { breakpoints } from 'const'

const SSquareButton = styled.button<{ active?: boolean; noBorder?: boolean }>`
  color: ${(props) => (props.active ? 'var(--button-square-active-color) !important' : 'inherit')};
  background-color: ${(props) => (props.active ? 'var(--button-square-active-bg) !important' : 'var(--bg)')};
  border: ${(props) => (!props.noBorder ? '1px solid var(--border-secondary)' : '1px solid transparent')};
  border-radius: var(--radius);
  height: 40px;
  width: 40px;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: var(--button-square-hover-bg);
  }

  @media (max-width: ${breakpoints.sm}) {
    border-radius: 50%;
  }
`

interface SquareButtonInterface {
  disabled?: boolean
  onClick: () => void
  icon?: JSX.Element
  noBorder?: boolean
  active?: boolean
}

export function SquareButton({ icon = <IconClose />, ...props }: SquareButtonInterface): JSX.Element {
  return <SSquareButton {...props}>{icon}</SSquareButton>
}
