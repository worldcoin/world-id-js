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
  display: flex;
  min-width: 183px;
  min-height: 183px;
  justify-content: flex-end;
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
