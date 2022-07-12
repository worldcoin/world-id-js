import { WIDLogo } from 'assets/logos'
// import { useActions, useValues } from 'kea'
// import { worldLogic } from 'worldLogic'
import { Checkbox } from './Checkbox'
// import { verificationLogic } from 'verificationLogic'
// import { MouseEvent as ReactMouseEvent } from 'react'
import { styled } from '@stitches/react'
import { Dispatch, SetStateAction } from 'react'

const SWorldIDBox = styled('div', {
  display: 'grid',
  padding: 'var(--wld-box-border-width)',
  background: 'linear-gradient(to right, var(--wld-box-border-gradient-from), var(--wld-box-border-gradient-to))',
  borderRadius: '12px',
  height: '56px',
  width: '100%',
  maxWidth: '350px',
  minWidth: '250px',
  boxSizing: 'border-box',
})

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 16px',
  color: 'var(--wld-box-color);',
  backgroundColor: 'var(--wld-box-bg)',
  borderRadius: 'calc(12px - var(--wld-box-border-width))',
})

const MainContainer = styled('div', {
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '18px',
})

const LogoContainer = styled('div', {
  '--gradient-from': 'var(--wld-box-logo-gradient-from)',
  '--gradient-to': 'var(--wld-box-logo-gradient-to)',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
})

export function WorldIDBox(props: { setIsModalVisible: Dispatch<SetStateAction<boolean>> }): JSX.Element {
  // const { activate, showLearnMore } = useActions(worldLogic)
  // const { isAppEnabled, isAppTerminated } = useValues(worldLogic)
  // const { verificationState } = useValues(verificationLogic)

  // const handleLearnMore = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (isAppEnabled && !isAppTerminated) {
  //     e.stopPropagation()
  //     showLearnMore()
  //   }
  // }

  return (
    <SWorldIDBox data-testId="world-id-box" onClick={() => props.setIsModalVisible(true)}>
      <Container>
        <Checkbox isChecked={false} />
        <MainContainer>I&apos;m doing this once</MainContainer>
        <LogoContainer>
          <WIDLogo />
        </LogoContainer>
      </Container>
    </SWorldIDBox>
  )
}
