import { motion } from 'framer-motion'
import { styled } from 'stitches'

export const SDialogHeaderButton = motion(
  styled('button', {
    display: 'grid',
    placeContent: 'center',
    width: 40,
    height: 40,
    margin: 0,
    padding: 0,
    fontSize: '24px',
    color: '$color',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: '$sm',
    cursor: 'pointer',

    '@smDown': {
      borderRadius: '50%',
    },

    variants: {
      bordered: {
        true: {
          borderColor: '#BBBEC74D',
        },
      },
    },
  })
)

interface DialogHeaderButtonProps {
  bordered?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

export const DialogHeaderButton = (props: DialogHeaderButtonProps): JSX.Element => {
  return <SDialogHeaderButton {...props} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} />
}
