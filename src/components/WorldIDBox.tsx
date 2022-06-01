import { IconHelpCircle } from 'assets/icons'
import { WorldcoinLogomark, WorldIDLettermark } from 'assets/logos'
import { useActions, useValues } from 'kea'
import { worldLogic } from 'worldLogic'
import styled from 'styled-components'
import { VerificationState } from 'types'
import { Checkbox } from './Checkbox'
import { verificationLogic } from 'verificationLogic'
import React from 'react'

interface SWorldIDBox {
  disabled?: boolean
  terminated?: boolean
}

const SWorldIDBox = styled.div`
  border: 1px solid var(--wid-box-border);
  border-radius: 100px;
  height: 56px;
  width: 100%;
  max-width: 350px;
  min-width: 250px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  cursor: ${(props: SWorldIDBox) => (props.disabled ? 'not-allowed' : props.terminated ? 'default' : 'pointer')};
  padding: 0 16px;
  opacity: ${(props: SWorldIDBox) => (props.disabled ? '0.5' : undefined)};
`

const SMainContainer = styled.div`
  flex-grow: 1;
  user-select: none;
`

const SLogoContainer = styled.div`
  font-size: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-right: 6px;
`

const SLetterMarkContainer = styled.div`
  font-size: 0.5rem;
  line-height: 1rem;
`

const SLearnMoreContainer = styled.div`
  font-size: 0.7rem;
  position: absolute;
  top: -5px;
  right: 1px;
  color: var(--primary);
`

export function WorldIDBox(): JSX.Element {
  const { activate, showLearnMore } = useActions(worldLogic)
  const { isAppEnabled, isAppTerminated } = useValues(worldLogic)
  const { verificationState } = useValues(verificationLogic)

  const handleLearnMore = (e: React.MouseEvent<HTMLDivElement>): void => {
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
      <Checkbox isChecked={verificationState === VerificationState.Confirmed} />
      <SMainContainer>I'm doing this once</SMainContainer>
      <SLogoContainer>
        <WorldcoinLogomark />
        <SLetterMarkContainer>
          <WorldIDLettermark />
        </SLetterMarkContainer>
        <SLearnMoreContainer onClick={handleLearnMore}>
          <IconHelpCircle />
        </SLearnMoreContainer>
      </SLogoContainer>
    </SWorldIDBox>
  )
}
