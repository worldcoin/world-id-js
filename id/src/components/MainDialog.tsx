import { ReactNode } from 'react'
import { styled } from 'stitches'
import { Dialog } from './Dialog'

const SMainDialog = styled(Dialog, {})

export function MainDialog(props: { children: ReactNode }) {
  return <SMainDialog>{props.children}</SMainDialog>
}
