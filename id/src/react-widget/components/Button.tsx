import { styled } from 'react-widget/stitches'

export const Button = styled('button', {
  display: 'inline-grid',
  gridAutoFlow: 'column',
  alignItems: 'center',
  padding: 0,
  border: 0,
  outline: 0,
  background: 'transparent',
  borderRadius: '$lg',
  cursor: 'pointer',

  variants: {
    variant: {
      default: {},
      link: {
        //height: 56,
        fontFamily: '"Rubik"',
        fontSize: '18px',
        fontWeight: 500,
      },
    },
    size: {
      sm: {
        height: 24,
        padding: '0 10px',
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
        color: '$buttonDefaultColor',
        background: '$buttonDefaultBg',
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
        position: 'relative',
        minHeight: 44,
        padding: '0 24px',
        fontFamily: '"Sora"',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '18px',
        textTransform: 'uppercase',
        background: `
          linear-gradient(to right, $background, $background) padding-box,
          linear-gradient(to right, $buttonGradientFrom, $buttonGradientTo) border-box
        `,
        border: '2px solid transparent',
      },
    },
    //{
    //  variant: 'link',
    //  color: 'default',
    //  muted: false,
    //  css: {
    //    color: 'grey6',
    //  },
    //},
    //{
    //  variant: 'link',
    //  color: 'default',
    //  muted: 'true',
    //  css: {
    //    color: 'grey5',
    //  },
    //},
  ],
})
