import styled from 'styled-components'
import { ButtonInterface, SButton } from './Button'

const SGradientWrapper = styled.div`
  background: linear-gradient(to right, red, purple);
  padding: 1px;
  border-radius: 1000px;
  display: flex;
  &:hover {
    background: unset;
    a {
      background: var(--gradient);
    }

    span {
      color: white;
      background: unset;
      -webkit-background-clip: unset;
      -webkit-text-fill-color: unset;
      background-clip: unset;
    }
  }
`

const SGradientLink = styled(SButton).attrs({ as: 'a' })`
  background-color: white;
  border-radius: 1000px;
  padding: ${(props) => (props.size === 'sm' ? '7px 16px' : '14px 32px')};
  overflow: hidden;
  white-space: nowrap;
`

const SGradientText = styled.span`
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
        <SGradientText>{children}</SGradientText>
      </SGradientLink>
    </SGradientWrapper>
  )
}
