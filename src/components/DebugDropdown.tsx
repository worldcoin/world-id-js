import styled from 'styled-components'
import { IconCode, MaximizeIcon } from 'assets/icons'
import { SquareButton } from 'components/SquareButton'
import { useCallback, useRef, useState, memo } from 'react'

const SRoot = styled.div`
  position: relative;
`

const SMenu = styled.div`
  position: absolute;
  z-index: 1000;
  top: 100%;
  right: 0;
  margin-top: 8px;
  padding: 12px;
  color: var(--dropdown-menu-color);
  background-color: var(--dropdown-menu-bg);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px 0 #00000029;
  white-space: nowrap;
`

const SMenuTitle = styled.div`
  padding: 4px 0;
  line-height: 16px;
  font-family: 'Sora', sans-serif;
  font-size: 12px;
  font-weight: 600;
`

const SMenuItem = styled.div`
  padding: 8px 0;
`

const SMenuLink = styled.a`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  line-height: 16px;
  font-family: 'Sora', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--dropdown-menu-link-color);
  cursor: pointer;
  & > svg {
    width: 16px;
    height: 16px;
    margin-left: 8px;
  }
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`

const SMenuText = styled.div`
  line-height: 11px;
  font-family: 'Rubik', sans-serif;
  font-size: 11px;
  color: var(--dropdown-menu-text-color);
`

export const DebugDropdown = memo((): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null)

  const [open, setOpen] = useState(false)

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onOpen = useCallback(() => {
    setOpen(true)
    const listener = (event: MouseEvent) => {
      if (event.target instanceof Node && ref.current && !ref.current.contains(event.target)) {
        document.removeEventListener('click', listener)
        onClose()
      }
    }
    document.addEventListener('click', listener)
  }, [onClose])

  return (
    <SRoot ref={ref}>
      <SquareButton active={open} noBorder onClick={onOpen} icon={<IconCode />} />
      {open && (
        <SMenu>
          <SMenuTitle>Running in Dev mode</SMenuTitle>
          <SMenuItem>
            <SMenuLink href="https://simulator.worldcoin.org" target="_blank" rel="noopener">
              Go to simulator <MaximizeIcon />
            </SMenuLink>
            <SMenuText>to scan the QR and test</SMenuText>
          </SMenuItem>
          <SMenuItem>
            <SMenuLink href="https://id.worldcoin.org/test" target="_blank" rel="noopener">
              How to test World ID? <MaximizeIcon />
            </SMenuLink>
          </SMenuItem>
          <SMenuItem>
            <SMenuLink href="https://id.worldcoin.org/docs/js" target="_blank" rel="noopener">
              JS Widget docs <MaximizeIcon />
            </SMenuLink>
          </SMenuItem>
          <SMenuItem>
            <SMenuText>Debug messages shown in console</SMenuText>
          </SMenuItem>
        </SMenu>
      )}
    </SRoot>
  )
})
