import { MouseEventHandler, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ComponentProps } from '@stitches/react'
import { styled, lightTheme, darkTheme } from 'stitches'
import { widgetLogic } from 'logics/widgetLogic'

const OverlayRoot = styled('div', {
  width: '100%',
  height: '100vh',
  position: 'fixed',
  zIndex: 2147483647, // maximum possible value
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

export interface OverlayProps extends ComponentProps<typeof OverlayRoot> {
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

  const theme = widgetLogic.props.theme

  const children = (
    <OverlayRoot
      className={theme === 'dark' ? darkTheme : lightTheme}
      open={props.open}
      onClick={handleClick}
      data-testid="overlay"
    >
      {props.children}
    </OverlayRoot>
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const container = document.getElementsByTagName('body')[0]! // body always present

  return createPortal(children, container)
}
