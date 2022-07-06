import styled from 'styled-components'
import { breakpoints } from 'const'

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

const SGradientLink = styled.a<{ size: LinkGradientInterface['size'] }>`
  padding: 12px 24px;
  line-height: 18px;
  font-family: 'Sora', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  color: var(--link-gradient-color);
  background-color: var(--link-gradient-bg);
  border-radius: 10px;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: ${breakpoints.sm}) {
    padding: 19px 24px;
  }
`

interface LinkGradientInterface {
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
