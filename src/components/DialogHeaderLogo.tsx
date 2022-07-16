import { ComponentProps } from '@stitches/react'
import { styled } from 'stitches'
import { WorldcoinLogo } from 'assets/logos'

export const SDialogHeaderLogo = styled('div', {
  flexGrow: 1,
  display: 'grid',
  alignItems: 'center',
  fontSize: '24px',

  variants: {
    centered: {
      true: {
        justifyContent: 'center',
      },
    },
  },
})

export function DialogHeaderLogo(props: Omit<ComponentProps<typeof SDialogHeaderLogo>, 'children'>) {
  return (
    <SDialogHeaderLogo {...props}>
      <WorldcoinLogo />
    </SDialogHeaderLogo>
  )
}
