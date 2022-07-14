// import { VerificationState } from 'types'
import { useActions } from 'kea'
// import { verificationLogic } from 'verificationLogic'
import { worldLogic } from 'worldLogic'

import { styled } from 'react-widget/stitches'
import { WIDLogo } from 'assets/logos'
import { Box } from 'react-widget/components/Box'
import { IconCircleSuccess } from 'assets/icons'

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
})

const SLogo = styled('div', {
  '--gradient-from': '$colors$gradientFrom',
  '--gradient-to': '$colors$gradientTo',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
})

export function WorldIDBox() {
  const { activate } = useActions(worldLogic)
  // const { isAppEnabled, isAppTerminated } = useValues(worldLogic)
  //const { verificationState } = useValues(verificationLogic)

  return (
    <Box css={{ width: 254 }}>
      <SCaptcha onClick={activate} data-testId="world-id-box">
        <SCheckbox checked={true}>{true && <IconCircleSuccess />}</SCheckbox>
        <SText>I&apos;m a unique person</SText>
        <SLogo>
          <WIDLogo />
        </SLogo>
      </SCaptcha>
    </Box>
  )
}
