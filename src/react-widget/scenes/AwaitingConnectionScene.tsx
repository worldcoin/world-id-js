import { useMedia } from 'react-widget/hooks/useMedia'
import { useActions, useValues } from 'kea'
import { worldLogic } from 'worldLogic'

import { styled } from 'react-widget/stitches'
import { IconCircleSuccess, IconClose, IconCode } from 'assets/icons'
import { Qrcode } from 'react-widget/components/Qrcode'
import { Typography } from 'react-widget/components/Typography'
import { Dialog } from 'react-widget/components/Dialog'
import { DialogHeader } from 'react-widget/components/DialogHeader'
import { DialogHeaderLogo } from 'react-widget/components/DialogHeaderLogo'
import { DialogHeaderButton } from 'react-widget/components/DialogHeaderButton'
import { Button } from 'react-widget/components/Button'
import { useCallback, useEffect, useState } from 'react'
import { WorldcoinApp } from 'assets/logos'
import { verificationLogic } from 'verificationLogic'

const SMain = styled(Dialog, {
  width: 500,

  '@smDown': {
    width: 'auto',
  },
})

const SMainContent = styled('div', {
  display: 'grid',
  gridTemplate: `
    "text code" auto
    "copy code" 1fr / 1fr auto
  `,
  alignItems: 'end',
  justifyItems: 'start',

  '@smDown': {
    justifyItems: 'center',
    gridTemplate: `
      "code"
      "text"
      "cta"
      "copy"
    `,
  },
})

const SMainText = styled('div', {
  gridArea: 'text',

  '@smDown': {
    maxWidth: 340,
  },
})

const SMainTextTitle = styled(Typography, {
  maxWidth: 236,
  marginTop: 16,

  '@smDown': {
    maxWidth: 'none',
    marginTop: 24,
    textAlign: 'center',
  },
})

const SMainTextCaption = styled(Typography, {
  maxWidth: 212,
  marginTop: 12,

  '@smDown': {
    maxWidth: 'none',
    margin: '16px 0 32px',
    textAlign: 'center',
  },
})

const SMainCopy = styled('div', {
  gridArea: 'copy',
})

const SMainCode = styled('div', {
  gridArea: 'code',
})

const SMainCta = styled('div', {
  gridArea: 'cta',
  display: 'none',

  '@smDown': {
    display: 'block',
    width: '100%',
  },
})

const SCta = styled(Dialog, {
  width: 500,
  marginTop: 8,
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridTemplateRows: 'auto auto',
  gridGap: '16px 0',
  alignItems: 'center',
})

const SCtaHeader = styled('div', {
  gridColumn: '1 / 3',
})

const SDev = styled(Dialog, {
  width: 500,
  marginTop: 8,
  display: 'grid',

  '@smDown': {
    display: 'none',
  },
})

const SDevHeader = styled('div', {})

export function AwaitingConnectionScene() {
  const { isDevMode } = useValues(worldLogic)
  const { qrCodeContent } = useValues(verificationLogic)
  const { terminate } = useActions(worldLogic)

  const { media } = useMedia()
  const [codeShown, setCodeShown] = useState(false) // Used for mobile
  const toggleCodeShown = useCallback(() => {
    setCodeShown((codeShown) => !codeShown)
  }, [])

  return (
    <>
      <SMain>
        <DialogHeader>
          <DialogHeaderLogo />
          {media === 'desktop' && isDevMode && (
            <DialogHeaderButton>
              <IconCode />
            </DialogHeaderButton>
          )}
          <DialogHeaderButton bordered onClick={terminate}>
            <IconClose />
          </DialogHeaderButton>
        </DialogHeader>
        <SMainContent>
          <SMainText>
            {/* TODO make Typography components be able to be rendered as different tags, not only div */}
            <SMainTextTitle variant="h1" color="gradient">
              Prove you haven’t done this before with World ID
            </SMainTextTitle>
            <SMainTextCaption variant="p1">
              Scan or copy this QR code with your phone’s camera or Worldcoin mobile app.
            </SMainTextCaption>
          </SMainText>
          <SMainCopy>
            {media === 'desktop' && <CopyToClipboard size="sm" data={qrCodeContent} />}
            {media !== 'desktop' && !codeShown && (
              <Button variant="link" color="default" size="xl" onClick={toggleCodeShown}>
                Show QR code instead
              </Button>
            )}
            {media !== 'desktop' && codeShown && <CopyToClipboard variant="link" size="xl" data={qrCodeContent} />}
          </SMainCopy>
          <SMainCode>
            {media !== 'desktop' && !codeShown ? (
              <WorldcoinApp />
            ) : qrCodeContent ? (
              <Qrcode data={qrCodeContent} />
            ) : null}
          </SMainCode>
          <SMainCta>
            <Button color="gradient" size="xl" fullWidth>
              Get Worldcoin app
            </Button>
          </SMainCta>
        </SMainContent>
      </SMain>

      {media === 'desktop' && !isDevMode && (
        <SCta>
          <SCtaHeader>
            <Typography variant="h2">Don’t have the Worldcoin app yet?</Typography>
          </SCtaHeader>
          <Typography variant="p1">Proving unique-humanness through biometrics, without intruding privacy.</Typography>
          <Button color="gradient">Install now</Button>
        </SCta>
      )}

      {media === 'desktop' && isDevMode && (
        <SDev>
          <SDevHeader>
            <Typography variant="h2">Running in dev mode</Typography>
          </SDevHeader>
        </SDev>
      )}
    </>
  )
}

interface CopyToClipboardProps {
  variant?: 'link'
  size?: 'sm' | 'xl'
  muted?: boolean
  data?: string | null
}

function CopyToClipboard(props: CopyToClipboardProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timer)
    }
    return () => null
  }, [isCopied])

  const onClick = useCallback(() => {
    if (!props.data) {
      return
    }
    navigator.clipboard.writeText(props.data).then(() => {
      setIsCopied(true)
    })
  }, [props.data])

  return (
    <Button variant={props.variant} size={props.size} onClick={onClick}>
      {isCopied ? (
        <>
          <IconCircleSuccess style={{ marginRight: 4 }} /> Copied!
        </>
      ) : (
        'Copy QR code'
      )}
    </Button>
  )
}
