import { WIDLogo } from 'assets/logos'
import { useActions, useValues } from 'kea'
import { worldLogic } from 'worldLogic'
import styled from 'styled-components'
import { VerificationState } from 'types'
import { Checkbox } from './Checkbox'
import { verificationLogic } from 'verificationLogic'
import { MouseEvent as ReactMouseEvent } from 'react'

const SWorldIDBox = styled.div<{ disabled: boolean; terminated: boolean }>`
  user-select: none;
  display: grid;
  padding: var(--wld-box-border-width);
  background: linear-gradient(to right, var(--wld-box-border-gradient-from), var(--wld-box-border-gradient-to));
  border-radius: 12px;
  height: 56px;
  width: 100%;
  max-width: 350px;
  min-width: 250px;
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : props.terminated ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.5' : undefined)};
`

const SContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  color: var(--wid-box-color);
  background-color: var(--wld-box-bg);
  border-radius: calc(12px - var(--wld-box-border-width));
`

const SMainContainer = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
`

const SLogoContainer = styled.div<{ onClick: (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void }>`
  --gradient-from: var(--wld-box-logo-gradient-from);
  --gradient-to: var(--wld-box-logo-gradient-to);
  display: grid;
  align-items: center;
  justify-content: center;
`

export function WorldIDBox(): JSX.Element {
  const { activate, showLearnMore } = useActions(worldLogic)
  const { isAppEnabled, isAppTerminated } = useValues(worldLogic)
  const { verificationState } = useValues(verificationLogic)

  const handleLearnMore = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isAppEnabled && !isAppTerminated) {
      e.stopPropagation()
      showLearnMore()
    }
  }

  return (
    <SWorldIDBox
      onClick={isAppEnabled && !isAppTerminated ? activate : undefined}
      disabled={!isAppEnabled}
      terminated={isAppTerminated}
      data-testId="world-id-box"
    >
      <SContainer>
        <Checkbox isChecked={verificationState === VerificationState.Confirmed} />
        <SMainContainer>I&apos;m doing this once</SMainContainer>
        <SLogoContainer onClick={handleLearnMore}>
          <WIDLogo />
        </SLogoContainer>
      </SContainer>
    </SWorldIDBox>
  )
}
