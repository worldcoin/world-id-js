import { styled } from '@stitches/react'
import { WorldcoinLogo } from 'assets/logos'
import { IconCircleSuccess, IconClose, IconCode } from 'assets/icons'
import { QrRender } from './QrRender'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

const ModalOverlay = styled('div', {
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
  justifyContent: 'center',
  alignContent: 'center',
  transition: 'opacity, visibility ease-out 1s',
  opacity: '0',
  pointerEvents: 'none',
  visibility: 'hidden',

  variants: {
    visible: {
      true: { opacity: '1', pointerEvents: 'all', visibility: 'visible' },
      false: { opacity: '0', pointerEvents: 'none', visibility: 'hidden' },
    },
  },
})

const ModalBox = styled('div', {
  display: 'grid',
  rowGap: '6px',
})

const MainModalBox = styled('div', {
  background: '#FFFFFF',
  borderRadius: '12px',
  boxShadow: '0px 8px 64px rgba(0, 0, 0, 0.08);',
  padding: '32px',
  color: '#191C20',
})

const InfoModalBox = MainModalBox

export const Modal = (props: { isVisible?: boolean; setIsVisible: Dispatch<SetStateAction<boolean>> }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timer)
    }

    return () => null
  }, [isCopied])

  const copyQrCode = useCallback(() => {
    if (false) {
      return
    }

    navigator.clipboard.writeText('test')
    setIsCopied(true)
  }, [])

  return (
    <ModalOverlay
      visible={props.isVisible}
      onClick={(e) => (e.currentTarget === e.target ? props.setIsVisible(false) : undefined)}
    >
      <ModalBox>
        <MainModalBox>
          <WorldcoinLogo />

          <button>
            <IconCode />
          </button>

          <button onClick={() => props.setIsVisible(false)}>
            <IconClose />
          </button>

          <h1>Prove you haven’t done this before with World ID</h1>
          <p>Scan or copy this QR code with your phone’s camera or Worldcoin mobile app.</p>

          <QrRender data="tezxcvzxcvzxvfdzsdfsdvczxcst" />
          <button onClick={copyQrCode}>
            <span>{isCopied ? 'QR code copied' : 'Copy QR code'}</span>
            {isCopied && <IconCircleSuccess style={{ width: '16px', height: '16px' }} />}
          </button>
        </MainModalBox>
        <InfoModalBox>
          <h2>Don’t have the Worldcoin app yet?</h2>
          <p>Proving unique-humanness through biometrics, without intruding privacy.</p>

          <button>Install now</button>
        </InfoModalBox>
      </ModalBox>
    </ModalOverlay>
  )
}
