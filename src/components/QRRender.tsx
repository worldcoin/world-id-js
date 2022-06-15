import { useEffect, useRef } from 'preact/hooks'
import QRCodeStyling from 'qr-code-styling'
import styled from 'styled-components'
import renderToString from 'preact-render-to-string'
import { WorldcoinLogomark } from 'assets/logos'

const logoB64 = window.btoa(renderToString(<WorldcoinLogomark />))

const qrCode = new QRCodeStyling({
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
    color: 'var(--qr-color)',
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

const SQRContainer = styled.div`
  position: relative;
  z-index: 0;
  display: flex;
  width: 198px;
  height: 198px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--qr-container-color);
  border-radius: 2px;
  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    background: var(--bg);
  }
  &::before {
    top: 24px;
    bottom: 24px;
    left: -1px;
    right: -1px;
  }
  &::after {
    top: -1px;
    bottom: -1px;
    left: 24px;
    right: 24px;
  }
  & > * {
    position: relative;
  }
`

interface QRRenderInterface {
  data: string
}

export function QRRender({ data }: QRRenderInterface): JSX.Element {
  const qrContainRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    qrContainRef?.current && qrCode.append(qrContainRef.current)
  }, [])

  useEffect(() => {
    qrCode.update({ data })
  }, [data])

  return <SQRContainer ref={qrContainRef} />
}
