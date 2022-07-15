import { styled } from 'react-widget/stitches'

export const DialogHeader = styled('div', {
  display: 'grid',
  columnGap: '12px',
  marginTop: -16,
  padding: '16px 0',

  variants: {
    extended: {
      true: {
        gridTemplateColumns: 'auto 1fr auto auto',

        '@smDown': {
          gridTemplateColumns: 'auto 1fr auto',
        },
      },
      false: {
        gridTemplateColumns: '1fr auto auto',

        '@smDown': {
          gridTemplateColumns: '1fr auto',
        },
      },
    },
  },
})
