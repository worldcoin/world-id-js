import styled from 'styled-components'
import { breakpoints } from 'const'

export const Button = styled.button<{ block?: boolean }>`
  width: ${(props) => (props.block ? '100%' : undefined)};
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

export const StealthButton = styled(Button)<{ secondary?: boolean; onClick?: () => void }>`
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
      color: ${(props) => (props.secondary ? '#858494' : 'var(--button-stealth-mobile-color)')};
      background: transparent;
    }
    &:hover {
      opacity: 0.7;
    }
  }
`
