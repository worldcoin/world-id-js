import { useMedia } from 'hooks/useMedia'
import { useActions, useValues } from 'kea'

import { styled } from 'stitches'
import {
  DevModeDocsIcon,
  DevModeSimulatorIcon,
  DevModeTestingIcon,
  DevModeWorldcoinAppIcon,
  IconCircleSuccess,
  IconClose,
  IconCode,
  IconLeft,
} from 'assets/icons'
import { Qrcode } from 'components/Qrcode'
import { Typography } from 'components/Typography'
import { Dialog } from 'components/Dialog'
import { DialogHeader } from 'components/DialogHeader'
import { DialogHeaderLogo } from 'components/DialogHeaderLogo'
import { DialogHeaderButton } from 'components/DialogHeaderButton'
import { Button } from 'components/Button'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { WorldcoinApp } from 'assets/logos'
import { DevModeLink } from 'components/DevModeButton'
import { widgetLogic } from 'logic/widgetLogic'
import { verificationLogic } from 'logic/verificationLogic'
import { LearnMoreScene } from './LearnMoreScene'
import { ModalView } from 'types/modal-view'

const SModal = styled('div', {
  transitionProperty: 'max-height',
  transition: '1000ms',

  variants: {
    centered: {
      true: {
        maxHeight: '320px',
      },
      false: {
        maxHeight: '562px',
      },
    },
  },
})

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
const SBottomDialog = styled(Dialog, {
  width: 500,
  marginTop: '8px',
  transitionProperty: 'opacity, transform, visibility',
  transition: '1000ms',

  variants: {
    hidden: {
      true: {
        opacity: '0',
        visibility: 'hidden',
        transform: 'translateY(100%)',
      },
    },
  },

  '@smDown': {
    display: 'none',
  },
})

const SCta = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridTemplateRows: 'auto auto',
  gridGap: '16px 0',
  alignItems: 'center',
})

const SCtaHeader = styled('div', {
  gridColumn: '1 / 3',
})

const SDev = styled('div', {
  width: '100%',
  display: 'grid',
  rowGap: '12px',
})

const SDevHeader = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
})

const SDevButtonsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
})

const SDevModeStamp = styled('div', {
  background: '$primaryA10',
  border: '1px solid',
  borderColor: '$primaryA50',
  borderRadius: '$md',
  padding: '4px 10px',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  columnGap: '8px',
  alignItems: 'center',
  color: '$primary',
})

export function AwaitingConnectionScene() {
  const { qrCodeContent, isDevMode, modalView } = useValues(widgetLogic)
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
    color?: 'primary' | 'default'
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

  return (
    <SModal centered={!isVerificationFlow}>
      <SMain>
        <DialogHeader extended={!isVerificationFlow}>
          {!isVerificationFlow && (
            <DialogHeaderButton onClick={() => setModalView(ModalView.VerificationFlow)} bordered>
              <IconLeft />
            </DialogHeaderButton>
          )}
          <DialogHeaderLogo />
          {media === 'desktop' && isDevMode && (
            <DialogHeaderButton>
              <IconCode />
            </DialogHeaderButton>
          )}
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
            <>
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
                {media === 'desktop' && <CopyToClipboard color="default" size="sm" data={qrCodeContent} />}
                {media !== 'desktop' && !codeShown && (
                  <Button variant="link" color="default" size="xl" onClick={toggleCodeShown}>
                    Show QR code instead
                  </Button>
                )}
                {media !== 'desktop' && codeShown && (
                  <CopyToClipboard variant="link" color="primary" size="xl" data={qrCodeContent} />
                )}
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
            </>
          )}

          {!isVerificationFlow && <LearnMoreScene />}
        </SMainContent>
      </SMain>

      <SBottomDialog hidden={!isVerificationFlow}>
        {media === 'desktop' && !isDevMode && (
          <SCta>
            <SCtaHeader>
              <Typography variant="h2">Don’t have the Worldcoin app yet?</Typography>
            </SCtaHeader>
            <Typography variant="p1">
              Proving unique-humanness through biometrics, without intruding privacy.
            </Typography>
            <Button color="gradient">Install now</Button>
          </SCta>
        )}

        {media === 'desktop' && isDevMode && (
          <SDev>
            <SDevHeader>
              <Typography variant="h2">Running in dev mode</Typography>

              <SDevModeStamp>
                <IconCode />

                <Typography variant="p1">Dev Mode</Typography>
              </SDevModeStamp>
            </SDevHeader>

            <SDevButtonsContainer>
              {/* TODO add proper urls */}
              <DevModeLink
                href={'#'}
                icon={<DevModeSimulatorIcon />}
                heading="Simulator"
                description={
                  <span style={{ margin: 0 }}>
                    Open the simulator to <strong>scan the QR code</strong> and mock a verification.
                  </span>
                }
              />

              <DevModeLink
                href={'#'}
                icon={<DevModeWorldcoinAppIcon />}
                heading="Worldcoin app"
                description="Open or install Worldcoin app to test in production"
              />

              <DevModeLink
                href={'#'}
                icon={<DevModeTestingIcon />}
                heading="Testing"
                description="Docs on how to test with the Staging network"
              />

              <DevModeLink href={'#'} icon={<DevModeDocsIcon />} heading="Docs" description="Docs for this widget" />
            </SDevButtonsContainer>
          </SDev>
        )}
      </SBottomDialog>
    </SModal>
  )
}
