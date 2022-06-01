import styled, { CSSProperties } from 'styled-components'

export interface ButtonInterface {
  type?: 'primary' | 'secondary' | 'stealth'
  size?: 'md' | 'sm'
  block?: boolean
  style?: CSSProperties
  disabled?: boolean
  onClick?: () => void
  children?: string | JSX.Element | JSX.Element[]
}

export const SButton = styled.button`
  border-radius: 1000px;
  outline: 0;
  border: 0;
  background-color: var(--primary);
  color: white;
  cursor: pointer;
  padding: 14px 32px;
  width: ${(props: ButtonInterface) => (props.block ? '100%' : undefined)};
  transition: background-color 0.2s ease-in-out;
  overflow: hidden;
  white-space: nowrap;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: var(--primary-hover);
  }

  ${(props: ButtonInterface) =>
    props.type === 'secondary' &&
    `
    background-color: var(--button-secondary);
    color: var(--text-default);
    &:hover {
        background-color: var(--button-secondary-hover);
    }
    `}

  ${(props: ButtonInterface) =>
    props.type === 'stealth' &&
    `
    background-color: var(--button-stealth);
    color: var(--text-default);
    &:hover {
        background-color: var(--button-stealth-hover);
    }
    `}

  ${(props: ButtonInterface) =>
    props.size === 'sm' &&
    `
    padding: 6px 12px;
    font-size: 0.75rem;
    `}
`

export function Button(props: ButtonInterface) {
  // @ts-expect-error TODO: Fix typing
  return <SButton {...props} />
}
