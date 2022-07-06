import { WorldcoinLogo } from 'assets/logos'
import styled from 'styled-components'
import { GlobalStyles } from 'styles'
import { SquareButton } from './SquareButton'
import { IconLeft } from 'assets/icons'
import { createPortal } from 'react-dom'
import { worldLogic } from 'worldLogic'
import { useActions, useValues } from 'kea'
import { PrincipalScene } from 'scenes/PrincipalScene'
import { CTAShownState, ModalView, VerificationState } from 'types'
import { LearnMoreScene } from 'scenes/LearnMoreScene'
import { ModalCTA } from 'scenes/CTAScene'
import { breakpoints } from 'const'
import { verificationLogic } from 'verificationLogic'

const Overlay = styled.div<{ shown: boolean }>`
  background-color: #000;
  opacity: 0.8;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5000;
  cursor: pointer;
  display: ${(props) => (props.shown ? 'block' : 'none')};
`

/**
 * Outer wrapper that holds the two modals (default & CTA)
 */
const ModalWrapper = styled.div<{ shown: boolean; ctaShownState: CTAShownState; wide: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  min-height: ${(props) => (props.ctaShownState === CTAShownState.Show ? '540px' : '360px')};
  transform: translate(-50%, -50%);
  width: ${(props) => (props.wide ? '500px' : '400px')};
  max-width: calc(100% - 32px);
  z-index: 10000;
  display: ${(props) => (props.shown ? 'block' : 'none')};
  transition: min-height ease-in 0.5s;

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
    max-height: 100%;
    max-width: unset;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    transform: unset;
    min-height: unset;
    overflow-y: auto;
  }
`

const ModalContent = styled.div`
  position: relative;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);

  @media (max-width: ${breakpoints.sm}) {
    height: 100%;
    padding-bottom: 32px;
    border-radius: 36px 36px 0 0;
  }
`

const SHeader = styled.div`
  padding: 32px 32px 16px;
  display: flex;
  align-items: center;
  color: var(--text);

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px 24px;
  }
`

const SHeaderLogo = styled.div<{ centered?: boolean | (() => void) }>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-size: 24px;
  justify-content: ${(props) => (props.centered ? 'center' : undefined)};
`

const SHeaderButtons = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 12px;
`

const SBody = styled.div`
  padding: 0 32px 32px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 0 24px 0;
  }
`

function ModalHeader({ additionalButtons }: { additionalButtons?: JSX.Element }): JSX.Element {
  const { hideModalCloseButton, modalGoBack } = useValues(worldLogic)
  const { terminate } = useActions(worldLogic)

  return (
    <SHeader>
      {modalGoBack && (
        <div>
          <SquareButton onClick={modalGoBack} icon={<IconLeft />} />
        </div>
      )}
      <SHeaderLogo centered={hideModalCloseButton || modalGoBack}>
        <WorldcoinLogo />
      </SHeaderLogo>
      <SHeaderButtons>
        {additionalButtons}
        {!hideModalCloseButton && <SquareButton onClick={terminate} />}
      </SHeaderButtons>
    </SHeader>
  )
}

function ModalBody(): JSX.Element {
  const { modalView } = useValues(worldLogic)
  return (
    <SBody>
      {/* We use { display: 'none' } instead of unmounting so the QR doesn't flicker when moving between views */}
      <div style={modalView !== ModalView.VerificationFlow ? { display: 'none' } : {}}>
        <PrincipalScene />
      </div>
      {modalView === ModalView.LearnMore && <LearnMoreScene />}
    </SBody>
  )
}

interface MainModalInterface {
  additionalButtons?: JSX.Element
}

export function MainModal(props: MainModalInterface): JSX.Element {
  const { verificationState } = useValues(verificationLogic)
  const { isAppActive, ctaShownState, theme, modalView } = useValues(worldLogic)
  const { terminate } = useActions(worldLogic)
  const { additionalButtons } = props

  const isWide = modalView === ModalView.VerificationFlow && verificationState === VerificationState.AwaitingConnection

  return createPortal(
    <GlobalStyles isDark={theme === 'dark'}>
      <Overlay onClick={terminate} shown={isAppActive} data-testId="overlay" />
      <ModalWrapper ctaShownState={ctaShownState} shown={isAppActive} data-testId="modal-wrapper" wide={isWide}>
        {isAppActive && (
          <>
            <ModalContent>
              <ModalHeader additionalButtons={additionalButtons} />
              <ModalBody />
            </ModalContent>
            <ModalCTA />
          </>
        )}
      </ModalWrapper>
    </GlobalStyles>,
    document.body
  )
}
