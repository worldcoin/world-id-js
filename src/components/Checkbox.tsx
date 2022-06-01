import { IconCircleSuccess } from 'assets/icons'
import styled from 'styled-components'

interface CheckboxInterface {
  isChecked: boolean
}

const SCheckbox = styled.div`
  border: ${(props: CheckboxInterface) => (props.isChecked ? undefined : '1px solid var(--border)')};
  border-radius: 50%;
  height: ${(props: CheckboxInterface) => (props.isChecked ? 'unset' : '18px')};
  width: ${(props: CheckboxInterface) => (props.isChecked ? 'unset' : '18px')};
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
export function Checkbox(props: CheckboxInterface): JSX.Element {
  return (
    <SCheckbox {...props}>
      <IconCircleSuccess />
    </SCheckbox>
  )
}
