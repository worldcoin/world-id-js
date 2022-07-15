import { styled } from 'react-widget/stitches'

export const DialogHeaderButton = styled('button', {
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
