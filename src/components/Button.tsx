import styled, { CSSProperties } from 'styled-components'
import { breakpoints } from 'const'

export const Button = styled.button`
  width: ${(props) => (props.fullWidth ? '100%' : undefined)};
  height: 54px;
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${(props) => (props.color === 'primary' ? 'var(--button-primary-color)' : 'var(--button-color)')};
  background-color: ${(props) => (props.color === 'primary' ? 'var(--button-primary-bg)' : 'var(--button-bg)')};
  border-radius: 12px;
  border: 0;
  outline: 0;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.color === 'primary' ? 'var(--button-primary-hover-bg)' : 'var(--button-hover-bg)'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const StealthButton = styled(Button)`
  height: 24px;
  padding: 0 10px;
  font-family: 'Rubik', sans-serif;
  font-size: 11px;
  font-weight: 400;
  text-transform: none;
  color: var(--button-stealth-color);
  background-color: var(--button-stealth-bg);
  border-radius: 8px;

  &:hover {
    background-color: var(--button-stealth-hover-bg);
  }

  @media (max-width: ${breakpoints.sm}) {
    line-height: 22px;
    font-size: 18px;
    &,
    &:hover {
      font-weight: 500;
      color: var(--button-stealth-mobile-color);
      background: transparent;
    }
  }
`

export interface ButtonInterface {
  type?: 'primary' | 'secondary' | 'stealth'
  size?: 'md' | 'sm'
  block?: boolean
  style?: CSSProperties
  disabled?: boolean
  onClick?: () => void
  children?: string | JSX.Element | JSX.Element[]
}
