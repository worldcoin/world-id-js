import styled, { CSSProperties } from 'styled-components'

export const SButton = styled.button`
  border-radius: 1000px;
  outline: 0;
  border: 0;
  background-color: var(--primary);
  color: white;
  cursor: pointer;
  padding: 14px 32px;
  width: ${(props) => (props.block ? '100%' : undefined)};
  transition: background-color 0.2s ease-in-out;
  overflow: hidden;
  white-space: nowrap;
  font-family: var(--font-family);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: var(--primary-hover);
  }

  ${(props) =>
    props.type === 'secondary' &&
    `
    background-color: var(--button-secondary);
    color: var(--button-secondary-text);
    &:hover {
        background-color: var(--button-secondary-hover);
    }
    `}

  ${(props) =>
    props.type === 'stealth' &&
    `
    background-color: var(--button-stealth);
    color: var(--text-default);
    &:hover {
        background-color: var(--button-stealth-hover);
    }
    `}

  ${(props) =>
    props.size === 'sm' &&
    `
    padding: 6px 12px;
    font-size: 0.75rem;
    `}
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

export function Button(props: ButtonInterface) {
  return <SButton {...props} />
}
