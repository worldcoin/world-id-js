import { createStitches, createTheme } from '@stitches/react'

export const { styled, css, getCssText } = createStitches({
  theme: {
    colors: {
      grey5: '#858494',
      grey6: '#191C20',
      teal: '#183C4A',
      primary: '#4940E0',
      onPrimary: '#ffffff',
      gradientFrom: '#FF6848',
      gradientTo: '#4940E0',
    },
    radii: {
      xl: '36px',
      lg: '12px',
      sm: '8px',
    },
  },
  media: {
    smDown: '(max-width: 768px)',
  },
})

export const lightTheme = createTheme({
  colors: {
    color: '#191c20',
    background: '#ffffff',
    buttonDefaultBg: '#f0edf9',
    buttonDefaultColor: '#183c4a',
    buttonPrimaryBg: '#4940e0',
    buttonPrimaryColor: '#ffffff',
    buttonGradientFrom: '#FF6848',
    buttonGradientTo: '#4940E0',
    circleDefaultBg: '#f9f9f9',
    circleDefaultColor: '#4940e0',
    circlePrimaryBg: '#4940e0',
    circlePrimaryColor: '#ffffff',
    captchaColor: '#183c4a',
    captchaGradientFrom: '#FF6848',
    captchaGradientTo: '#4940E0',
    loaderBg: '#f0edf9',
    loaderFg: '#4940e0',
    qrcode: 'black',
    qrcodeBorder: '#4940e01a',
  },
})

export const darkTheme = createTheme({
  colors: {
    color: '#ffffff',
    background: '#0c0e10',
    buttonDefaultBg: '#272b2f',
    buttonDefaultColor: '#858494',
    buttonPrimaryBg: '#4940e0',
    buttonPrimaryColor: '#ffffff',
    buttonGradientFrom: '#FF6848',
    buttonGradientTo: '#4940E0',
    circleDefaultBg: '#ffffff1c',
    circleDefaultColor: '#ffffff',
    circlePrimaryBg: '#4940e0',
    circlePrimaryColor: '#ffffff',
    captchaColor: '#ffffff',
    captchaGradientFrom: '#FF6848',
    captchaGradientTo: '#4940E0',
    loaderBg: '#101719',
    loaderFg: '#4940e0',
    qrcode: 'white',
    qrcodeBorder: '#ffffff1c',
  },
})
