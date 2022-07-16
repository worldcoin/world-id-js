import { ComponentProps } from '@stitches/react'
import { styled } from 'stitches'
import { keyframes } from '@stitches/react'

const animation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const SSvg = styled('svg', {
  display: 'block',
  fontSize: '32px',
  transform: 'translateZ(0)',
  animation: `${animation} 2s infinite linear`,
})

export function Loader(props: ComponentProps<typeof SSvg>) {
  return (
    <SSvg width="1em" height="1em" viewBox="0 0 36 36" fill="none" {...props}>
      <circle cx="17.9997" cy="17.9997" r="15.9997" stroke="var(--colors-loaderBg)" strokeWidth="4" />
      <path
        d="M33.9981 17.9997C33.9981 15.3386 33.3343 12.7194 32.0668 10.3795C30.7994 8.03951 28.9683 6.05265 26.7394 4.59879C24.5104 3.14492 21.9541 2.26998 19.3017 2.05319C16.6494 1.83639 13.9849 2.28459 11.5495 3.3572C9.11404 4.42981 6.9846 6.09295 5.35399 8.19602C3.72338 10.2991 2.64309 12.7757 2.21094 15.4015"
        stroke="url(#paint0_linear_7782_165735)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7782_165735"
          x1="36.9975"
          y1="17.9997"
          x2="1.99805"
          y2="17.9997"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--colors-loaderFg)" />
          <stop offset="1" stopColor="var(--colors-loaderFg)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </SSvg>
  )
}
