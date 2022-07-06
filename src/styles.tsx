import styled from 'styled-components'

export const GlobalStyles = styled.div<{ isDark?: boolean }>`
  --radius: 8px;
  --primary: #4940e0;
  --button-color: ${(props) => (props.isDark ? '#858494' : '#183c4a')};
  --button-bg: ${(props) => (props.isDark ? '#272b2f' : '#f0edf9')};
  --button-hover-bg: ${(props) => (props.isDark ? '#3f454b' : '#dfd9f2')};
  --button-primary-color: #ffffff;
  --button-primary-bg: #4940e0;
  --button-primary-hover-bg: #2a21ca;
  --button-stealth-color: ${(props) => (props.isDark ? '#ffffff' : '#191c20')};
  --button-stealth-bg: ${(props) => (props.isDark ? '#272B2F' : '#f1f2f2')};
  --button-stealth-hover-bg: ${(props) => (props.isDark ? '#3f454b' : '#e5e6e6')};
  --button-stealth-mobile-color: ${(props) => (props.isDark ? '#ffffff' : '#4940e0')};
  --button-square-hover-bg: ${(props) => (props.isDark ? '#FFFFFF1A' : '#0101010D')};
  --button-square-active-color: ${(props) => (props.isDark ? '#0C0E10' : '#FFFFFF')};
  --button-square-active-bg: ${(props) => (props.isDark ? '#FFFFFF' : '#4940e0')};
  --text: ${(props) => (props.isDark ? '#ffffff' : '#010101')};
  --text-default: ${(props) => (props.isDark ? '#ffffff' : '#183c4a')};
  --text-muted: #bbbec7;
  --stateful-bg: ${(props) => (props.isDark ? '#ffffff33' : '#f9f9f9')};
  --stateful-color: ${(props) => (props.isDark ? '#ffffff' : '#4940e0')};
  --stateful-primary-bg: #4940e0;
  --stateful-primary-color: #ffffff;
  --border-secondary: ${(props) => (props.isDark ? 'rgba(187, 190, 199, 0.3)' : '#edecfc')};
  --border: ${(props) => (props.isDark ? '#ffffff33' : '#ffffff')};
  --bg: ${(props) => (props.isDark ? '#0c0e10' : 'white')};
  --gradient: linear-gradient(90deg, #ff6848 0%, #4940e0 100%);
  --qr-container-color: ${(props) => (props.isDark ? '#ffffff1c' : '#4940e01a')};
  --qr-color: ${(props) => (props.isDark ? 'white' : 'black')};
  --success: #217237;
  --danger: #ff6848;
  --wld-box-color: ${(props) => (props.isDark ? '#ffffff' : '#183c4a')};
  --wld-box-bg: ${(props) => (props.isDark ? '#191c20' : '#ffffff')};
  --wld-box-border-width: 2px;
  --wld-box-border-gradient-from: #ff6848;
  --wld-box-border-gradient-to: #4940e0;
  --wld-box-logo-gradient-from: ${(props) => (props.isDark ? '#4940e0' : '#ff6848')};
  --wld-box-logo-gradient-to: ${(props) => (props.isDark ? '#7C74FB' : '#4940e0')};
  --link-gradient-from: #4940e0;
  --link-gradient-to: ${(props) => (props.isDark ? '#ff5b26' : '#ff6848')};
  --link-gradient-color: ${(props) => (props.isDark ? 'white' : '#191c20')};
  --link-gradient-bg: ${(props) => (props.isDark ? '#191c20' : 'white')};
  --loader: ${(props) => (props.isDark ? '#101719' : '#f0edf9')};
  --dropdown-menu-bg: ${(props) => (props.isDark ? '#353535' : '#ffffff')};
  --dropdown-menu-color: ${(props) => (props.isDark ? '#ffffff33' : '#000000')};
  --dropdown-menu-link-color: ${(props) => (props.isDark ? '#ffffff' : '#4940e0')};
  --dropdown-menu-text-color: ${(props) => (props.isDark ? '#ffffff33' : '#0c0e104d')};
  --font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-family: var(--font-family);
  color: var(--text-default);
  font-size: 14px;
  line-height: 22px;

  a {
    text-decoration: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate3d(0, -10%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    99% {
      height: initial;
    }
    to {
      opacity: 0;
      transform: translate3d(0, -10%, 0);
      height: 0;
    }
  }
`
