import { useActions, useValues } from 'kea'
import { styled } from 'stitches'
import { WIDLogo, WorldcoinLogomark } from 'assets/logos'
import { Box } from 'components/Box'
import { IconCircleSuccess } from 'assets/icons'
import { widgetLogic } from 'logic/widgetLogic'
import { keyframes } from '@stitches/react'
import { verificationLogic } from 'logic/verificationLogic'
import { useMemo } from 'react'
import { MouseEvent as ReactMouseEvent } from 'react'
import { ModalView, VerificationState } from 'types'

const SCaptcha = styled('button', {
  display: 'grid',
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
      true: {
        gridTemplateColumns: 'auto 1fr auto',
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
  fontFamily: 'Sora',
})

const SLogo = styled('div', {
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
  color: '$color',
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

  const showLearnMore = (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isWidgetAvailable || widgetLoading) {
      return
    }

    event.stopPropagation()
    setModalView(ModalView.LearnMore)
    activateModal()
  }

  return (
    <Box>
      <SCaptcha
        onClick={() => {
          setModalView(ModalView.VerificationFlow)
          activateModal()
        }}
        data-testid="world-id-box"
        disabled={isVerified || widgetLoading || (!isWidgetAvailable && !widgetLoading)}
        grid={isWidgetAvailable && !widgetLoading}
      >
        {isWidgetAvailable && !widgetLoading && (
          <>
            <SCheckbox checked={isVerified}>{isVerified && <IconCircleSuccess />}</SCheckbox>
            <SText>I&apos;m a unique person</SText>
            {/* FIXME only the question mark icon should open the learn more modal; fix typescript (make sure rendered HTML is valid) */}
            <SLogo onClick={showLearnMore}>
              <WIDLogo />
            </SLogo>
          </>
        )}

        {!isWidgetAvailable && !widgetLoading && <SErrorMessage>Widget is unavailable</SErrorMessage>}

        {widgetLoading && (
          <Preloader>
            <WorldcoinLogomark style={{ width: '100%', height: '100%' }} />
          </Preloader>
        )}
      </SCaptcha>
    </Box>
  )
}
