import { styled } from 'stitches'

export const Dialog = styled('div', {
  boxSizing: 'border-box',
  minHeight: 0,
  overflow: 'auto',
  padding: '24px',
  color: '$color',
  background: '$background',
  borderRadius: '$lg',
  boxShadow: '0px 8px 64px rgba(0, 0, 0, 0.08)',

  '@smDown': {
    borderRadius: '$xl $xl 0 0',
  },
})
