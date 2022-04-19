import styled from 'styled-components'

export const GlobalStyles = styled.div`
  --radius: 8px;
  --primary: #4940e0;
  --primary-hover: #2a21ca;
  --button-secondary: #f0edf9;
  --button-secondary-hover: #dfd9f2;
  --button-stealth: #f1f2f2;
  --button-stealth-hover: #e5e6e6;
  --text-default: #183c4a;
  --text-muted: #bbbec7;
  --border: #183c4a;
  --border-secondary: #edecfc;
  --bg-mid: #f9f9f9;
  --gradient: linear-gradient(90deg, #ff6848 0%, #4940e0 100%);
  --success: #217237;
  --danger: #ff6848;
  --wid-box-border: #183c4a;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  color: var(--text-default);
  font-size: 14px;
  line-height: 22px;

  a {
    color: var(--primary);
    text-decoration: none;
  }

  p {
    color: var(--text-default);
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
