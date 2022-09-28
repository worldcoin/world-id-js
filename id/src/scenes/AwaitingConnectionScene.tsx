import { useMedia } from 'hooks/useMedia'
import { useActions, useValues } from 'kea'

import { styled } from 'stitches'
import { IconCircleSuccess, IconClose, IconLeft } from 'assets/icons'
import { Qrcode } from 'components/Qrcode'
import { Typography } from 'components/Typography'
import { DialogHeader } from 'components/DialogHeader'
import { DialogHeaderLogo } from 'components/DialogHeaderLogo'
import { DialogHeaderButton } from 'components/DialogHeaderButton'
import { Button } from 'components/Button'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { WorldcoinApp } from 'assets/logos'
import { widgetLogic } from 'logics/widgetLogic'
import { verificationLogic } from 'logics/verificationLogic'
import { LearnMoreScene } from './LearnMoreScene'
import { ModalView } from 'types'

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

export function AwaitingConnectionScene() {
  const { qrCodeContent, modalView } = useValues(widgetLogic)
  const { disableModal, setModalView } = useActions(widgetLogic)
  const { terminate } = useActions(verificationLogic)

  const { media } = useMedia()
  const [codeShown, setCodeShown] = useState(false) // Used for mobile
  const toggleCodeShown = useCallback(() => {
    setCodeShown((codeShown) => !codeShown)
  }, [])

  const isVerificationFlow = useMemo(() => modalView === ModalView.VerificationFlow, [modalView])

  interface CopyToClipboardProps {
    variant?: 'link'
    size?: 'sm' | 'xl'
    muted?: boolean
    data?: string | null
    color?: 'primary' | 'neutral'
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
      <Button variant={props.variant} size={props.size} color={props.color} onClick={onClick}>
        {isCopied && <IconCircleSuccess style={{ marginRight: 4 }} />}
        <span>{isCopied ? 'Copied!' : 'Copy QR code'}</span>
      </Button>
    )
  }

  return (
    <Fragment>
      <DialogHeader extended={!isVerificationFlow}>
        {!isVerificationFlow && (
          <DialogHeaderButton onClick={() => setModalView(ModalView.VerificationFlow)} bordered>
            <IconLeft />
          </DialogHeaderButton>
        )}

        <DialogHeaderLogo />

        <DialogHeaderButton
          bordered
          onClick={() => {
            terminate()
            disableModal()
          }}
        >
          <IconClose />
        </DialogHeaderButton>
      </DialogHeader>

      <SMainContent>
        {isVerificationFlow && (
          <Fragment>
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
              {media === 'desktop' && <CopyToClipboard color="neutral" size="sm" data={qrCodeContent?.default} />}

              {media !== 'desktop' && !codeShown && (
                <Button variant="link" color="default" size="xl" onClick={toggleCodeShown}>
                  Show QR code instead
                </Button>
              )}

              {media !== 'desktop' && codeShown && (
                <CopyToClipboard
                  variant="link"
                  color="primary"
                  size="xl"
                  data={qrCodeContent?.mobile || qrCodeContent?.default}
                />
              )}
            </SMainCopy>

            <SMainCode>
              {media !== 'desktop' && !codeShown ? (
                <WorldcoinApp />
              ) : qrCodeContent ? (
                <Qrcode data={qrCodeContent.default} />
              ) : null}
            </SMainCode>

            <SMainCta>
              <Button
                color="gradient"
                size="xl"
                fullWidth
                as="a"
                href={(qrCodeContent?.mobile || qrCodeContent?.default) ?? 'https://worldcoin.org/verify'}
                target="_blank"
              >
                Open Worldcoin app
              </Button>
            </SMainCta>
          </Fragment>
        )}

        {!isVerificationFlow && <LearnMoreScene />}
      </SMainContent>
    </Fragment>
  )
}
