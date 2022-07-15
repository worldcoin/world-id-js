import { MouseEventHandler, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from 'react-widget/stitches'

const Root = styled('div', {
  width: '100%',
  height: '100vh',
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'rgba(0,0,0,0.6)',
  color: '#FFFFFF',
  display: 'grid',
  alignContent: 'center',
  justifyContent: 'center',
  transition: 'opacity, visibility ease-out 1s',
  opacity: '0',
  pointerEvents: 'none',
  visibility: 'hidden',

  '@smDown': {
    alignContent: 'end',
    justifyContent: 'stretch',
  },

  variants: {
    open: {
      true: { opacity: '1', pointerEvents: 'all', visibility: 'visible' },
      false: { opacity: '0', pointerEvents: 'none', visibility: 'hidden' },
    },
  },
})

export interface OverlayProps extends ComponentProps<typeof Root> {
  onClose: () => void
}
export function Overlay(props: OverlayProps) {
  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.currentTarget === event.target) {
        props.onClose()
      }
    },
    [props.onClose]
  )

  return (
    <Root open={props.open} onClick={handleClick}>
      {props.children}
    </Root>
  )
}
