import { styled } from '@stitches/react'
import { IconCircleSuccess } from 'assets/icons'

const CheckboxElement = styled('div', {
  borderRadius: '50%',
  fontSize: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    isChecked: {
      true: {
        height: 'unset',
        width: 'unset',
      },
      false: {
        border: '1px solid currentColor',
        height: '18px',
        width: '18px',
      },
    },
  },
})

export const Checkbox = ({ isChecked }: { isChecked: boolean }): JSX.Element => {
  return (
    <CheckboxElement isChecked={isChecked}>
      <IconCircleSuccess />
    </CheckboxElement>
  )
}
