import { WorldcoinLogo } from 'assets/logos'
import styled from 'styled-components'
import { GlobalStyles } from 'styles'
import { SquareButton } from './SquareButton'
import { IconLeft } from 'assets/icons'
import { createPortal } from 'react-dom'
import { worldLogic } from 'worldLogic'
import { useActions, useValues } from 'kea'
import { PrincipalScene } from 'scenes/PrincipalScene'
import { CTAShownState, ModalView } from 'types'
import { LearnMoreScene } from 'scenes/LearnMoreScene'
import { ModalCTA } from 'scenes/CTAScene'
import { breakpoints } from 'const'

interface OverlayProps {
  shown?: boolean
}

interface ModalWrapperProps {
  ctaShownState: CTAShownState
  shown?: boolean
}

interface SHeaderLogoProps {
  centered?: boolean
}

const Overlay = styled.div`
  background-color: #000;
  opacity: 0.8;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5000;
  cursor: pointer;
  display: ${(props: OverlayProps) => (props.shown ? 'block' : 'none')};
`

/**
 * Outer wrapper that holds the two modals (default & CTA)
 */
const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  min-height: ${(props: ModalWrapperProps) => (props.ctaShownState === CTAShownState.Show ? '540px' : '360px')};
  transform: translate(-50%, -50%);
  width: 460px;
  max-width: calc(100% - 32px);
  z-index: 10000;
  display: ${(props: ModalWrapperProps) => (props.shown ? 'block' : 'none')};
  transition: min-height ease-in 0.5s;

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
    max-height: unset;
    max-width: unset;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: unset;
    min-height: 620px;
  }
`

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  border-radius: var(--radius);

  @media (max-width: ${breakpoints.sm}) {
    border-radius: 0;
    height: 100%;
  }
`

const SHeader = styled.div`
  padding: 32px 32px 16px;
  display: flex;
  align-items: center;

  @media (max-width: ${breakpoints.sm}) {
    padding: 32px 16px 16px;
  }
`

const SHeaderLogo = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-size: 24px;
  justify-content: ${(props: SHeaderLogoProps) => (props.centered ? 'center' : undefined)};
`

const SBody = styled.div`
  padding: 0 32px 32px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 0 16px 0;
  }
`

function ModalHeader(): JSX.Element {
  const { hideModalCloseButton, modalGoBack } = useValues(worldLogic)
  const { terminate } = useActions(worldLogic)

  return (
    <SHeader>
      {modalGoBack && (
        <div>
          <SquareButton onClick={modalGoBack} icon={<IconLeft />} />
        </div>
      )}
      <SHeaderLogo centered={hideModalCloseButton || Boolean(modalGoBack)}>
        <WorldcoinLogo />
      </SHeaderLogo>
      {!hideModalCloseButton && (
        <div>
          <SquareButton onClick={terminate} />
        </div>
      )}
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

export function MainModal(): JSX.Element {
  const { isAppActive, ctaShownState } = useValues(worldLogic)
  const { terminate } = useActions(worldLogic)

  return createPortal(
    <GlobalStyles>
      <Overlay onClick={terminate} shown={isAppActive} data-testId="overlay" />
      <ModalWrapper ctaShownState={ctaShownState} shown={isAppActive} data-testId="modal-wrapper">
        {isAppActive && (
          <>
            <ModalContent>
              <ModalHeader />
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
