import { IconCircleSuccess } from 'assets/icons'
import styled from 'styled-components'

const SCheckbox = styled.div<{ isChecked: boolean }>`
  border: ${(props) => (props.isChecked ? undefined : '1px solid currentColor')};
  border-radius: 50%;
  height: ${(props) => (props.isChecked ? 'unset' : '18px')};
  width: ${(props) => (props.isChecked ? 'unset' : '18px')};
  margin-right: 8px;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    !props.isChecked &&
    `
    svg {
      display:none;
    }
  `}
`

// Checkbox indicator for the World ID box. Not an actual checkbox, just a visual representation.
export function Checkbox({ isChecked }: { isChecked: boolean }): JSX.Element {
  return (
    <SCheckbox isChecked={isChecked}>
      <IconCircleSuccess />
    </SCheckbox>
  )
}
