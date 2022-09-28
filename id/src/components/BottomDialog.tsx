import {
  DevModeDocsIcon,
  DevModeSimulatorIcon,
  DevModeTestingIcon,
  DevModeWorldcoinAppIcon,
  IconCode,
} from 'assets/icons'
import { motion } from 'framer-motion'
import { useMedia } from 'hooks/useMedia'
import { useValues } from 'kea'
import { widgetLogic } from 'logics/widgetLogic'
import { useMemo } from 'react'
import { styled } from 'stitches'
import { ModalView } from 'types'
import { Button } from './Button'
import { DevModeLink } from './DevModeButton'
import { Dialog } from './Dialog'
import { Typography } from './Typography'

const SBottomDialog = motion(
  styled(Dialog, {
    width: 500,
    marginTop: '8px',
    '@smDown': {
      display: 'none',
    },
  })
)

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

export function BottomDialog() {
  const { modalView, isDevMode } = useValues(widgetLogic)
  const { media } = useMedia()
  const isVisible = useMemo(() => modalView === ModalView.VerificationFlow, [modalView])

  return (
    <SBottomDialog
      hidden={!isVisible}
      initial={{ marginTop: -40, opacity: 0 }}
      animate={{ marginTop: 8, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, marginTop: -400, scale: 0, transition: { duration: 0.15 } }}
    >
      {media === 'desktop' && !isDevMode && (
        <SCta>
          <SCtaHeader>
            <Typography variant="h2">Don’t have the Worldcoin app yet?</Typography>
          </SCtaHeader>
          <Typography variant="p1">Proving unique-humanness through biometrics, without intruding privacy.</Typography>
          <Button color="gradient" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Install now
          </Button>
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
            <DevModeLink
              href="https://simulator.worldcoin.org"
              icon={<DevModeSimulatorIcon />}
              heading="Simulator"
              description={
                <span style={{ margin: 0 }}>
                  Open the simulator to <strong>scan the QR code</strong> and mock a verification.
                </span>
              }
            />

            <DevModeLink
              href="https://worldcoin.org/verify"
              icon={<DevModeWorldcoinAppIcon />}
              heading="Worldcoin app"
              description="Open or install Worldcoin app to test in production"
            />

            <DevModeLink
              href="https://id.worldcoin.org/test"
              icon={<DevModeTestingIcon />}
              heading="Testing"
              description="Docs on how to test with the Staging network"
            />

            <DevModeLink
              href="https://id.worldcoin.org/docs/js"
              icon={<DevModeDocsIcon />}
              heading="Docs"
              description="Docs for this widget"
            />
          </SDevButtonsContainer>
        </SDev>
      )}
    </SBottomDialog>
  )
}
