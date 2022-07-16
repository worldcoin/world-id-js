import { CSSProperties } from '@stitches/react'

export function IconClose({ style }: { style?: CSSProperties }) {
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

export function IconHelpCircle({ style }: { style?: CSSProperties }) {
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

export function IconLeft({ style }: { style?: CSSProperties }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path d="M12.4647 15L7.5 10.0178L12.5 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export function IconFailure() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconSuccess() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
      <path d="M4 11.8438L9.66667 17.6875L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconCircleSuccess({ style }: { style?: CSSProperties }) {
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

export function IconCircleFailure({ style }: { style?: CSSProperties }) {
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

export function IconArrowUp({ style }: { style?: CSSProperties }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M5.02854 8.78088C4.78431 9.02511 4.38834 9.02511 4.14411 8.78088C3.89988 8.53665 3.89988 8.14068 4.14411 7.89645L8.97449 3.06607C9.54436 2.49621 10.4683 2.4962 11.0382 3.06607L15.8685 7.89645C16.1128 8.14068 16.1128 8.53665 15.8685 8.78088C15.6243 9.02511 15.2283 9.02511 14.9841 8.78088L10.6317 4.42848V16.6771C10.6317 17.0225 10.3517 17.3025 10.0063 17.3025C9.66093 17.3025 9.38094 17.0225 9.38094 16.6771V4.42848L5.02854 8.78088Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconArrowDown({ style }: { style?: CSSProperties }) {
  return <IconArrowUp style={{ transform: 'rotate(180deg)', ...style }} />
}

export function IconCode({ style }: { style?: CSSProperties }) {
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

export function MaximizeIcon({ style }: { style?: CSSProperties }) {
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

export function DevModeSimulatorIcon() {
  return (
    <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.41406 15.4282C8.41406 12.8338 10.4899 10.7305 13.0504 10.7305C14.317 10.7305 15.4664 11.2454 16.3029 12.0812"
        stroke="currentColor"
        stroke-width="0.428571"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.5013 10.5645L16.427 12.2439L14.8242 12.3429"
        stroke="currentColor"
        stroke-width="0.428571"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.7658 15.3105C17.7658 17.905 15.69 20.0083 13.1295 20.0083C11.8629 20.0083 10.7135 19.4933 9.87695 18.6576"
        stroke="currentColor"
        stroke-width="0.428571"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.67969 20.169L9.75396 18.4896L11.3567 18.3945"
        stroke="currentColor"
        stroke-width="0.428571"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.10395 6.3074C3.70933 6.3074 4.20008 5.80661 4.20008 5.18885C4.20008 4.5711 3.70933 4.07031 3.10395 4.07031C2.49857 4.07031 2.00781 4.5711 2.00781 5.18885C2.00781 5.80661 2.49857 6.3074 3.10395 6.3074Z"
        fill="currentColor"
      />
      <path
        d="M6.75629 6.3074C7.36167 6.3074 7.85243 5.80661 7.85243 5.18885C7.85243 4.5711 7.36167 4.07031 6.75629 4.07031C6.15091 4.07031 5.66016 4.5711 5.66016 5.18885C5.66016 5.80661 6.15091 6.3074 6.75629 6.3074Z"
        fill="currentColor"
      />
      <path
        d="M10.4047 6.3074C11.0101 6.3074 11.5009 5.80661 11.5009 5.18885C11.5009 4.5711 11.0101 4.07031 10.4047 4.07031C9.79935 4.07031 9.30859 4.5711 9.30859 5.18885C9.30859 5.80661 9.79935 6.3074 10.4047 6.3074Z"
        fill="currentColor"
      />
      <path
        d="M0.214286 3.25424C0.214286 1.57532 1.57532 0.214286 3.25424 0.214286H22.9287C24.6077 0.214286 25.9687 1.57532 25.9687 3.25424V8.38988H0.214286V3.25424Z"
        stroke="currentColor"
        stroke-width="0.428571"
      />
      <path
        d="M0.214286 8.36468H25.9687V20.7459C25.9687 22.4249 24.6077 23.7859 22.9287 23.7859H3.25424C1.57532 23.7859 0.214286 22.4249 0.214286 20.7459V8.36468Z"
        stroke="currentColor"
        stroke-width="0.428571"
      />
    </svg>
  )
}

export function DevModeWorldcoinAppIcon() {
  return (
    <svg width="24" height="34" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.186567"
        y="0.186567"
        width="23.6269"
        height="33.5092"
        rx="2.79851"
        stroke="currentColor"
        stroke-width="0.373134"
      />
      <path
        d="M4.18896 0H19.8156L18.509 2.80667C18.2423 3.38318 17.661 3.75234 17.0316 3.75234H6.98363C6.34897 3.75234 5.77297 3.38318 5.5063 2.80667L4.19963 0H4.18896Z"
        fill="currentColor"
      />
      <path
        d="M6.28223 30.8496H18.2556"
        stroke="currentColor"
        stroke-width="0.746269"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.0664 15.9833C13.2516 15.1847 15.1171 13.1905 16.0105 13.8553C17.0474 14.6538 15.8392 16.2649 15.4133 16.8834C15.4133 16.8834 15.33 16.0248 14.6495 15.2447C14.1079 15.5909 13.608 15.9417 13.3117 16.1495C13.2886 16.1633 13.2562 16.1772 13.2238 16.1772C13.1914 16.1772 13.159 16.1633 13.1358 16.1495C13.1081 16.131 13.0895 16.1079 13.0757 16.0756C13.0664 16.0433 13.0618 16.011 13.071 15.9833H13.0664ZM13.8256 17.1881C13.8256 17.1881 13.7839 17.2158 13.7746 17.2343C13.7608 17.2527 13.7515 17.2758 13.7469 17.3035C13.7376 17.3404 13.7469 17.382 13.7654 17.4189C13.7839 17.4558 13.8163 17.4789 13.8533 17.4882C14.1959 17.5897 14.7838 17.7743 15.3856 17.9867C15.205 19.0115 14.5986 19.6162 14.5986 19.6162C15.3439 19.5654 17.3298 19.5285 17.302 18.2083C17.265 17.0866 14.5616 16.8511 13.8302 17.1973V17.1881H13.8256ZM13.3673 18.5406C13.3395 18.5268 13.3071 18.5222 13.2747 18.5268C13.2469 18.5268 13.2145 18.5452 13.196 18.5683C13.1729 18.5914 13.159 18.6191 13.1497 18.6514C13.1451 18.6837 13.1497 18.716 13.159 18.7437C13.2886 19.0807 13.5201 19.6531 13.7284 20.2717C12.8257 20.7656 11.9832 20.6594 11.9832 20.6594C12.4831 21.218 13.7515 22.7736 14.756 21.9335C15.5985 21.2041 14.0987 18.9099 13.3719 18.5452L13.3673 18.5406ZM12.0388 19.0207C12.0388 18.9976 12.0249 18.9745 12.0063 18.9561C11.9925 18.9376 11.9739 18.9192 11.9508 18.9145C11.9184 18.9007 11.8767 18.8961 11.8397 18.9145C11.8027 18.9284 11.7749 18.9515 11.7518 18.9884C11.5758 19.3069 11.2703 19.8378 10.9324 20.3917C9.98808 19.9855 9.54369 19.2423 9.54369 19.2423C9.42333 19.9901 9.01598 21.9658 10.2936 22.2381C11.3768 22.4551 12.2147 19.8331 12.0434 19.0299L12.0388 19.0207ZM10.8445 18.2637C10.8445 18.2637 10.8676 18.2221 10.8769 18.199C10.8769 18.176 10.8769 18.1483 10.8769 18.1252C10.8676 18.0882 10.8445 18.0559 10.8121 18.0329C10.7796 18.0098 10.7426 18.0005 10.7056 18.0098C10.3491 18.0698 9.74737 18.1575 9.10856 18.2267C8.83544 17.225 9.12708 16.4172 9.12708 16.4172C8.47901 16.7819 6.70145 17.6959 7.28471 18.873C7.79391 19.8701 10.3353 18.9007 10.8491 18.2683L10.8445 18.2637ZM10.6824 16.8419C10.6824 16.8419 10.7334 16.8419 10.7519 16.828C10.775 16.8142 10.7935 16.8004 10.8028 16.7819C10.8259 16.7496 10.8398 16.7126 10.8352 16.6711C10.8352 16.6342 10.8121 16.5972 10.7843 16.5695C10.5204 16.3249 10.0714 15.9048 9.62239 15.4432C10.2242 14.5985 11.0342 14.3307 11.0342 14.3307C10.3445 14.0399 8.53919 13.1952 7.99296 14.3953C7.54394 15.4201 9.86773 16.8373 10.6732 16.8465H10.6778L10.6824 16.8419ZM11.8073 15.891C11.8443 15.891 11.8814 15.8771 11.9138 15.8494C11.9415 15.8217 11.9601 15.7848 11.9601 15.7433C11.9832 15.3786 12.0295 14.7646 12.1036 14.1184C13.1312 14.0722 13.8348 14.5477 13.8348 14.5477C13.6265 13.8229 13.159 11.8565 11.8953 12.1704C10.8259 12.452 11.1824 15.1801 11.6777 15.831C11.6916 15.8494 11.7101 15.8679 11.7379 15.8771C11.761 15.891 11.7842 15.891 11.8073 15.891Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function DevModeTestingIcon() {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.84313 5.78299C3.39803 5.78299 3.84787 5.32396 3.84787 4.75771C3.84787 4.19146 3.39803 3.73242 2.84313 3.73242C2.28822 3.73242 1.83838 4.19146 1.83838 4.75771C1.83838 5.32396 2.28822 5.78299 2.84313 5.78299Z"
        fill="currentColor"
      />
      <path
        d="M6.18932 5.78299C6.74422 5.78299 7.19406 5.32396 7.19406 4.75771C7.19406 4.19146 6.74422 3.73242 6.18932 3.73242C5.63441 3.73242 5.18457 4.19146 5.18457 4.75771C5.18457 5.32396 5.63441 5.78299 6.18932 5.78299Z"
        fill="currentColor"
      />
      <path
        d="M9.536 5.78299C10.0909 5.78299 10.5407 5.32396 10.5407 4.75771C10.5407 4.19146 10.0909 3.73242 9.536 3.73242C8.98109 3.73242 8.53125 4.19146 8.53125 4.75771C8.53125 5.32396 8.98109 5.78299 9.536 5.78299Z"
        fill="currentColor"
      />
      <path
        d="M6.146 21.7905V16.8094L8.33447 14.5762"
        stroke="currentColor"
        stroke-width="0.40678"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.7965 13.0762H18.2074L15.4819 15.8615"
        stroke="currentColor"
        stroke-width="0.40678"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.87354 21.7926V13.8477"
        stroke="currentColor"
        stroke-width="0.40678"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.7693 17.8505C15.4994 17.8505 16.0913 17.2465 16.0913 16.5014C16.0913 15.7563 15.4994 15.1523 14.7693 15.1523C14.0392 15.1523 13.4473 15.7563 13.4473 16.5014C13.4473 17.2465 14.0392 17.8505 14.7693 17.8505Z"
        fill="currentColor"
      />
      <path
        d="M8.6692 15.7743C9.39934 15.7743 9.99124 15.1703 9.99124 14.4252C9.99124 13.6802 9.39934 13.0762 8.6692 13.0762C7.93906 13.0762 7.34717 13.6802 7.34717 14.4252C7.34717 15.1703 7.93906 15.7743 8.6692 15.7743Z"
        fill="currentColor"
      />
      <path
        d="M3.87086 14.1141C4.601 14.1141 5.1929 13.5101 5.1929 12.7651C5.1929 12.02 4.601 11.416 3.87086 11.416C3.14072 11.416 2.54883 12.02 2.54883 12.7651C2.54883 13.5101 3.14072 14.1141 3.87086 14.1141Z"
        fill="currentColor"
      />
      <path
        d="M16.4817 11.3934C17.2118 11.3934 17.8037 10.7894 17.8037 10.0444C17.8037 9.29931 17.2118 8.69531 16.4817 8.69531C15.7516 8.69531 15.1597 9.29931 15.1597 10.0444C15.1597 10.7894 15.7516 11.3934 16.4817 11.3934Z"
        fill="currentColor"
      />
      <path
        d="M23.5951 10.0449H17.4121"
        stroke="currentColor"
        stroke-width="0.40678"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M0.20339 3.25424C0.20339 1.5693 1.5693 0.20339 3.25424 0.20339H20.7458C22.4307 0.20339 23.7966 1.5693 23.7966 3.25424V7.68342H0.20339V3.25424Z"
        stroke="currentColor"
        stroke-width="0.40678"
      />
      <path
        d="M0.20339 7.67409H23.7966V18.7448C23.7966 20.4297 22.4307 21.7956 20.7458 21.7956H3.25424C1.5693 21.7956 0.20339 20.4297 0.20339 18.7448V7.67409Z"
        stroke="currentColor"
        stroke-width="0.40678"
      />
    </svg>
  )
}
export function DevModeDocsIcon() {
  return (
    <svg width="24" height="34" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_1_2" fill="white">
        <path d="M2 2.98507C2 1.33646 3.33646 0 4.98507 0H21.0149C22.6635 0 24 1.33646 24 2.98507V29.0149C24 30.6635 22.6635 32 21.0149 32H4.98507C3.33646 32 2 30.6635 2 29.0149V2.98507Z" />
      </mask>
      <path
        d="M2 2.98507C2 1.13039 3.50352 -0.373134 5.35821 -0.373134H21.0149C22.8696 -0.373134 24.3731 1.13039 24.3731 2.98507L23.6269 2.98507C23.6269 1.54254 22.4575 0.373134 21.0149 0.373134H4.98507C3.33646 0.373134 2 1.54254 2 2.98507V2.98507ZM24 32H2H24ZM2 32V0V32ZM21.0149 -0.373134C22.8696 -0.373134 24.3731 1.13039 24.3731 2.98507V28.6418C24.3731 30.4965 22.8696 32 21.0149 32H21.0149C22.4575 32 23.6269 30.6635 23.6269 29.0149V2.98507C23.6269 1.54254 22.4575 0.373134 21.0149 0.373134L21.0149 -0.373134Z"
        fill="currentColor"
        mask="url(#path-1-inside-1_1_2)"
      />
      <rect
        x="0.186567"
        y="2.18094"
        width="21.6256"
        height="31.5143"
        rx="2.79851"
        stroke="currentColor"
        stroke-width="0.373134"
      />
      <path
        d="M4.31041 29.3963L18.3096 29.3963"
        stroke="currentColor"
        stroke-width="0.500014"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.00253 25.2407C6.08571 26.3698 9.8664 21.4706 7.8895 20.5345C7.44007 20.3222 6.9208 20.438 6.51996 20.7436C4.04201 22.6415 8.96146 26.4245 10.7592 24.2724C11.0659 23.9057 11.5487 23.8735 11.8311 24.2628C12.3474 24.9737 13.1643 25.1956 13.9629 24.5909C14.2757 24.3528 14.6917 24.3561 15.0075 24.5909C15.9246 25.2825 17.4005 25.5527 18.0017 24.4976"
        stroke="currentColor"
        stroke-width="0.500014"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M4.31041 10.9598H18.3096"
        stroke="currentColor"
        stroke-width="0.500014"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.31041 13.4505H18.3096"
        stroke="currentColor"
        stroke-width="0.500014"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.31041 15.9458H18.3096"
        stroke="currentColor"
        stroke-width="0.500014"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}