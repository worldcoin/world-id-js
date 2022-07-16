import { styled } from 'stitches'

export const Circle = styled('div', {
  display: 'grid',
  placeContent: 'center',
  width: 72,
  height: 72,
  fontSize: '24px',
  borderRadius: '50%',

  variants: {
    variant: {
      default: {},
      contained: {},
    },
    color: {
      default: {
        color: '$circleDefaultColor',
        backgroundColor: '$circleDefaultBg',
      },
      primary: {
        color: '$circlePrimaryColor',
        backgroundColor: '$circlePrimaryBg',
      },
    },
  },

  defaultVariants: {
    color: 'default',
  },
})
