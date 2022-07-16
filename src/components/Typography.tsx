import { styled } from 'stitches'

export const Typography = styled('div', {
  margin: 0,
  variants: {
    variant: {
      h1: {
        fontFamily: '"Sora"',
        fontSize: '24px',
        fontWeight: '600',
        lineHeight: '28.8px',
        '@smDown': {
          fontSize: '26px',
          lineHeight: '31.2px',
        },
      },
      h2: {
        fontFamily: '"Sora"',
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '24px',
      },
      h3: {
        fontFamily: '"Sora"',
        fontSize: '18px',
        fontWeight: '600',
        lineHeight: '24px',
      },
      p1: {
        fontFamily: '"Rubik"',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '18px',
      },
    },
    color: {
      gradient: {
        background: `linear-gradient(to right, $buttonGradientFrom, $buttonGradientTo)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
    centered: {
      true: {
        textAlign: 'center',
      },
    },
  },
})
