import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { styled } from 'stitches'
import { Dialog } from './Dialog'

const SMainDialog = motion(styled(Dialog, {}))

export function MainDialog(props: { children: ReactNode }) {
  return (
    <SMainDialog
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
    >
      {props.children}
    </SMainDialog>
  )
}
