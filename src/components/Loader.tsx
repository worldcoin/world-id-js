import styled from 'styled-components'

const SLoader = styled.div`
  color: var(--loader);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: loadAnimation 2s infinite linear;
  animation: loadAnimation 2s infinite linear;

  & > svg {
    display: block;
  }

  @-webkit-keyframes loadAnimation {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes loadAnimation {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`

export const Loader = (): JSX.Element => (
  <SLoader>
    <svg width="1em" height="1em" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17.9997" cy="17.9997" r="15.9997" stroke="currentColor" stroke-width="4" />
      <path
        d="M33.9981 17.9997C33.9981 15.3386 33.3343 12.7194 32.0668 10.3795C30.7994 8.03951 28.9683 6.05265 26.7394 4.59879C24.5104 3.14492 21.9541 2.26998 19.3017 2.05319C16.6494 1.83639 13.9849 2.28459 11.5495 3.3572C9.11404 4.42981 6.9846 6.09295 5.35399 8.19602C3.72338 10.2991 2.64309 12.7757 2.21094 15.4015"
        stroke="url(#paint0_linear_7782_165735)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
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
          <stop stop-color="#4940e0" />
          <stop offset="1" stop-color="#4940e0" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </SLoader>
)
