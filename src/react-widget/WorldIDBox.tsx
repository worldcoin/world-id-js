// import { VerificationState } from 'types'
import { useActions, useValues } from 'kea'
// import { verificationLogic } from 'verificationLogic'

import { styled } from 'react-widget/stitches'
import { WIDLogo, WorldcoinLogomark } from 'assets/logos'
import { Box } from 'react-widget/components/Box'
import { IconCircleSuccess } from 'assets/icons'
import { widgetLogic } from './logic/widgetLogic'
import { keyframes } from '@stitches/react'
import { verificationLogic } from './logic/verificationLogic'
import { VerificationState } from 'types'
import { useMemo } from 'react'
import { ModalView } from './types/modal-view'
import { MouseEvent as ReactMouseEvent } from 'react'

const SCaptcha = styled('button', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gridGap: '8px',
  alignItems: 'center',
  boxSizing: 'border-box',
  height: 56,
  width: '100%',
  maxWidth: 350,
  minWidth: 250,
  padding: '0 16px',
  textAlign: 'left',
  color: '$captchaColor',
  background: `
    linear-gradient(to right, $background, $background) padding-box,
    linear-gradient(to right, $captchaGradientFrom, $captchaGradientTo) border-box
  `,
  border: '2px solid transparent',
  borderRadius: '$lg',
  cursor: 'pointer',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: '0.6',
  },

  variants: {
    grid: {
      false: {
        gridTemplateColumns: 'auto',
      },
    },
  },
})

const SCheckbox = styled('div', {
  boxSizing: 'border-box',
  width: 20,
  height: 20,
  fontSize: '20px',
  border: '1px solid',
  borderRadius: '50%',

  variants: {
    checked: {
      true: {
        border: 0,
      },
    },
  },
})

const SText = styled('div', {
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '18px',
  fontFamily: 'Rubik',
})

const SLogo = styled('button', {
  '--gradient-from': '$colors$gradientFrom',
  '--gradient-to': '$colors$gradientTo',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  padding: '0',
  cursor: 'pointer',
})

const SErrorMessage = styled('h1', {
  fontSize: '14px',
  textAlign: 'center',
  fontFamily: 'Rubik',
})

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const Preloader = styled('div', {
  width: '24px',
  height: '24px',
  margin: '0px auto',
  animation: `${rotate} 2000ms linear infinite`,
})

export function WorldIDBox() {
  const { isWidgetAvailable, widgetLoading } = useValues(widgetLogic)
  const { activateModal, setModalView } = useActions(widgetLogic)
  const { verificationState } = useValues(verificationLogic)

  const isVerified = useMemo(() => verificationState === VerificationState.Confirmed, [verificationState])

  const showLearnMore = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isWidgetAvailable || widgetLoading) {
      return
    }

    event.stopPropagation()
    setModalView(ModalView.LearnMore)
    activateModal()
  }

  return (
    <Box>
      {isWidgetAvailable && !widgetLoading && (
        <SCaptcha
          onClick={() => {
            setModalView(ModalView.VerificationFlow)
            activateModal()
          }}
          data-testId="world-id-box"
          disabled={isVerified}
          grid
        >
          <SCheckbox checked={isVerified}>{isVerified && <IconCircleSuccess />}</SCheckbox>
          <SText>I&apos;m a unique person</SText>
          <SLogo onClick={showLearnMore}>
            <WIDLogo />
          </SLogo>
        </SCaptcha>
      )}
      {!isWidgetAvailable && !widgetLoading && (
        <SCaptcha disabled>
          <SErrorMessage>Widget is unavailable</SErrorMessage>
        </SCaptcha>
      )}
      {widgetLoading && (
        <SCaptcha disabled>
          <Preloader>
            <WorldcoinLogomark style={{ width: '100%', height: '100%' }} />
          </Preloader>
        </SCaptcha>
      )}
    </Box>
  )
}
