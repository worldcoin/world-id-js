import { CSSProperties } from 'styled-components'

export function IconClose({ style }: { style?: CSSProperties }): JSX.Element {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M5.5 5.5L14.5 14.5M14.5 5.5L5.5 14.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export function IconHelpCircle({ style }: { style?: CSSProperties }): JSX.Element {
  return (
    <svg width="1em" height="1em" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M5 3.20052L5 3.55052L5 3.20052ZM6 4.14231L5.65 4.14231L6 4.14231ZM3.65 4.14231C3.65 4.3356 3.8067 4.49231 4 4.49231C4.1933 4.49231 4.35 4.3356 4.35 4.14231L3.65 4.14231ZM5.7216 4.79431L5.47645 4.54451L5.47645 4.54451L5.7216 4.79431ZM4.65 5.86719C4.65 6.06049 4.8067 6.21719 5 6.21719C5.1933 6.21719 5.35 6.06049 5.35 5.86719L4.65 5.86719ZM5.06664 5.08203L5.08829 5.43136L5.06664 5.08203ZM5 5.15076L4.65 5.15076L5 5.15076ZM5 3.55052C5.37906 3.55052 5.65 3.83495 5.65 4.14231L6.35 4.14231C6.35 3.40939 5.72551 2.85052 5 2.85052L5 3.55052ZM5 2.85052C4.82553 2.85052 4.65233 2.88286 4.49012 2.94614L4.74452 3.59828C4.82495 3.5669 4.91182 3.55052 5 3.55052L5 2.85052ZM4.49012 2.94614C4.32788 3.00943 4.17915 3.1027 4.05293 3.22157L4.53285 3.73116C4.59235 3.67512 4.6641 3.62965 4.74452 3.59828L4.49012 2.94614ZM4.05293 3.22157C3.92667 3.34048 3.82531 3.4828 3.75574 3.64099L4.3965 3.92281C4.42744 3.85247 4.4734 3.78715 4.53285 3.73116L4.05293 3.22157ZM3.75574 3.64099C3.68614 3.79924 3.65 3.96965 3.65 4.14231L4.35 4.14231C4.35 4.06761 4.36559 3.99309 4.3965 3.92281L3.75574 3.64099ZM5.65 4.14231C5.65 4.29458 5.58684 4.43618 5.47645 4.54451L5.96676 5.04411C6.20122 4.81401 6.35 4.49613 6.35 4.14231L5.65 4.14231ZM5.47645 4.54451C5.36868 4.65027 5.21752 4.72201 5.045 4.7327L5.08829 5.43136C5.42962 5.41021 5.73929 5.26734 5.96676 5.04411L5.47645 4.54451ZM5.35 5.86719L5.35 5.15076L4.65 5.15076L4.65 5.86719L5.35 5.86719ZM5.045 4.7327C4.8377 4.74555 4.65 4.91535 4.65 5.15076L5.35 5.15076C5.35 5.31253 5.22209 5.42307 5.08829 5.43136L5.045 4.7327Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.99678 6.59687C5.18985 6.59687 5.34766 6.75333 5.34766 6.94688C5.34766 7.14042 5.19299 7.29687 5.00027 7.29687L4.99678 7.29687C4.80372 7.29687 4.64766 7.14042 4.64766 6.94687C4.64766 6.75332 4.80372 6.59687 4.99678 6.59687Z"
        fill="currentColor"
      />
      <circle cx="4.9987" cy="5.0026" r="3.66667" stroke="currentColor" stroke-width="0.7" />
    </svg>
  )
}

export function IconLeft({ style }: { style?: CSSProperties }): JSX.Element {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path d="M12.4647 15L7.5 10.0178L12.5 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export function IconFailure({ style }: { style?: CSSProperties }): JSX.Element {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export function IconCircleSuccess({ style }: { style?: CSSProperties }): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: '#217237', ...style }}
    >
      <rect x="2" y="2" width="20" height="20" rx="10" fill="currentColor" />
      <path
        d="M8.47175 12.0173C8.28035 11.8183 7.96383 11.812 7.76478 12.0034C7.56572 12.1948 7.55951 12.5114 7.75091 12.7104L8.47175 12.0173ZM10.4328 14.7782L10.0724 15.1248C10.166 15.2221 10.2951 15.2775 10.4301 15.2782C10.5652 15.2789 10.6949 15.2249 10.7895 15.1286L10.4328 14.7782ZM16.2458 9.57301C16.4393 9.376 16.4365 9.05943 16.2395 8.86593C16.0424 8.67244 15.7259 8.67529 15.5324 8.8723L16.2458 9.57301ZM7.75091 12.7104L10.0724 15.1248L10.7932 14.4317L8.47175 12.0173L7.75091 12.7104ZM10.7895 15.1286L16.2458 9.57301L15.5324 8.8723L10.0761 14.4279L10.7895 15.1286Z"
        fill="white"
      />
      <rect x="2" y="2" width="20" height="20" rx="10" stroke="currentColor" />
    </svg>
  )
}

export function IconCircleFailure({ style }: { style?: CSSProperties }): JSX.Element {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <rect x="2" y="2" width="20" height="20" rx="10" fill="#FF6848" />
      <path
        d="M9.25 9.25L14.75 14.75M14.75 9.25L9.25 14.75"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect x="2" y="2" width="20" height="20" rx="10" stroke="#FF6848" />
    </svg>
  )
}

export function IconArrowUp({ style }: { style?: CSSProperties }): JSX.Element {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M5.02854 8.78088C4.78431 9.02511 4.38834 9.02511 4.14411 8.78088C3.89988 8.53665 3.89988 8.14068 4.14411 7.89645L8.97449 3.06607C9.54436 2.49621 10.4683 2.4962 11.0382 3.06607L15.8685 7.89645C16.1128 8.14068 16.1128 8.53665 15.8685 8.78088C15.6243 9.02511 15.2283 9.02511 14.9841 8.78088L10.6317 4.42848V16.6771C10.6317 17.0225 10.3517 17.3025 10.0063 17.3025C9.66093 17.3025 9.38094 17.0225 9.38094 16.6771V4.42848L5.02854 8.78088Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconArrowDown({ style }: { style?: CSSProperties }): JSX.Element {
  return <IconArrowUp style={{ transform: 'rotate(180deg)', ...style }} />
}

export function IconCode({ style }: { style?: CSSProperties }): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M6.78955 8.30273L3.00008 12.3027L6.78955 16.3027"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.2104 8.30273L20.9999 12.3027L17.2104 16.3027"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.8877 7.00045L9.87874 17.493"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export function MaximizeIcon({ style }: { style?: CSSProperties }): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M13.9998 6L13.9998 2M13.9998 2L9.99984 2M13.9998 2L6.6665 9.33333"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 3.33398H6C3.79086 3.33398 2 5.12485 2 7.33398V10.0006C2 12.2098 3.79086 14.0007 6 14.0007H8.66666C10.8758 14.0007 12.6667 12.2098 12.6667 10.0007V8.00065"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
