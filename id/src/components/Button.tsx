import { motion } from 'framer-motion'
import { styled } from 'stitches'

export const Button = motion(
  styled('button', {
    boxSizing: 'border-box',
    display: 'inline-grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    border: 0,
    outline: 0,
    background: 'transparent',
    borderRadius: '$lg',
    cursor: 'pointer',
    textDecoration: 'none',

    variants: {
      variant: {
        default: {},
        link: {
          fontFamily: '"Rubik"',
          fontSize: '18px',
          fontWeight: 500,
        },
      },
      size: {
        sm: {
          height: 24,
          padding: '0 10px',
          fontSize: '11px',
          borderRadius: '$sm',
        },
        lg: {
          height: 54,
          fontFamily: '"Sora"',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '18px',
          textTransform: 'uppercase',
        },
        xl: {
          height: 60,
        },
      },
      color: {
        default: {},
        neutral: {},
        primary: {},
        gradient: {},
      },
      fullWidth: {
        true: {
          width: '100%',
        },
      },
    },

    defaultVariants: {
      variant: 'default',
      color: 'default',
    },

    compoundVariants: [
      {
        variant: 'default',
        color: 'default',
        css: {
          color: '$color',
          background: '$buttonDefaultBg',
        },
      },
      {
        variant: 'default',
        color: 'neutral',
        css: {
          color: '$buttonNeutralColor',
          background: '$buttonNeutralBg',
        },
      },
      {
        variant: 'default',
        color: 'primary',
        css: {
          color: '$buttonPrimaryColor',
          background: '$buttonPrimaryBg',
        },
      },
      {
        variant: 'default',
        color: 'gradient',
        css: {
          color: '$color',
          position: 'relative',
          minHeight: 44,
          padding: '0 24px',
          fontFamily: 'Sora',
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: '18px',
          textTransform: 'uppercase',
          background: `
          linear-gradient(to right, $background, $background) padding-box,
          linear-gradient(to right, $buttonGradientFrom, $buttonGradientTo) border-box
        `,
          border: '2px solid transparent',

          '@smDown': {
            transition: 'box-shadow 200ms',
            boxShadow: '0px 10px 20px rgba(255, 104, 72, 0.2);',

            '&:hover': {
              boxShadow: '0px 10px 20px rgba(255, 104, 72, 0.4);',
            },
          },
        },
      },
      {
        variant: 'link',
        color: 'default',
        css: {
          '@smDown': {
            fontWeight: 500,
            color: '$grey5',
          },
        },
      },
      {
        variant: 'link',
        color: 'primary',
        css: {
          '@smDown': {
            fontWeight: 500,
            color: '$primary',
          },
        },
      },
    ],
  })
)
