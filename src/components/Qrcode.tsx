import { useEffect, useRef } from 'react'
import { renderToString } from 'react-dom/server'
import { styled } from 'stitches'
import { WorldcoinLogomark } from 'assets/logos'
import QRCodeStyling from 'qr-code-styling'

const logoB64 = window.btoa(renderToString(<WorldcoinLogomark />))

const qrcode = new QRCodeStyling({
  width: 183,
  height: 183,
  type: 'svg',
  image: `data:image/svg+xml;base64,${logoB64}`,
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  cornersDotOptions: {
    type: 'dot',
  },
  dotsOptions: {
    color: 'var(--colors-qrcode)',
    type: 'extra-rounded',
  },
  backgroundOptions: {
    color: 'transparent',
  },
  imageOptions: {
    margin: 4,
    hideBackgroundDots: true,
  },
})

const Root = styled('div', {
  position: 'relative',
  zIndex: '0',
  boxSizing: 'border-box',
  display: 'flex',
  width: '216px',
  height: '216px',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid $qrcodeBorder',
  borderRadius: '2px',
  '&::before, &::after': {
    content: '',
    display: 'block',
    position: 'absolute',
    zIndex: ' -1',
    background: '$background',
  },
  '&::before': {
    top: '24px',
    bottom: '24px',
    left: '-1px',
    right: '-1px',
  },
  '&::after': {
    top: '-1px',
    bottom: '-1px',
    left: '24px',
    right: '24px',
  },
  '& > *': {
    position: 'relative',
  },
})

interface QRRenderInterface {
  data: string
}

export const Qrcode = ({ data }: QRRenderInterface): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    ref?.current && qrcode.append(ref.current)
  }, [])

  useEffect(() => {
    qrcode.update({ data })
  }, [data])
  return <Root ref={ref} />
}
