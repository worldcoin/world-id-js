import { MouseEventHandler, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ComponentProps } from '@stitches/react'
import { styled, lightTheme, darkTheme } from 'stitches'
import { widgetLogic } from 'logics/widgetLogic'
import { AnimatePresence, motion } from 'framer-motion'

const OverlayRoot = motion(
  styled('div', {
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

    '@smDown': {
      alignContent: 'end',
      justifyContent: 'stretch',
    },
  })
)

export interface OverlayProps extends ComponentProps<typeof OverlayRoot> {
  open: boolean
  onClose: () => void
}
export function Overlay(props: OverlayProps): JSX.Element {
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
    <AnimatePresence>
      {props.open && (
        <OverlayRoot
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={theme === 'dark' ? darkTheme : lightTheme}
          onClick={handleClick}
          data-testid="overlay"
        >
          {props.children}
        </OverlayRoot>
      )}
    </AnimatePresence>
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const container = document.getElementsByTagName('body')[0]! // body always present

  return createPortal(children, container)
}
