import styled from 'styled-components'
import { ButtonInterface } from './Button'

const SGradientWrapper = styled.div`
  background: linear-gradient(to right, var(--link-gradient-from), var(--link-gradient-to));
  padding: 2px;
  border-radius: 12px;
  display: grid;
  align-items: center;
  &:hover {
    background: unset;
    a {
      color: white;
      background: linear-gradient(to right, var(--link-gradient-from), var(--link-gradient-to));
    }
  }
`

const SGradientLink = styled.a`
  padding: 12px 24px;
  font-family: 'Sora', sans-serif;
  font-size: 1em;
  font-weight: 600;
  line-height: 1.286;
  text-transform: uppercase;
  color: var(--link-gradient-color);
  background-color: var(--link-gradient-bg);
  border-radius: 10px;
  overflow: hidden;
  white-space: nowrap;
`

interface LinkGradientInterface extends Omit<ButtonInterface, 'type' | 'size'> {
  children: string
  href: string
  target?: '_blank'
  size?: 'md' | 'sm'
}

export function LinkGradient({ children, size = 'md', ...restOfProps }: LinkGradientInterface) {
  return (
    <SGradientWrapper>
      <SGradientLink size={size} {...restOfProps}>
        {children}
      </SGradientLink>
    </SGradientWrapper>
  )
}
