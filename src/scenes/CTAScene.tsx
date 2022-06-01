import { LinkGradient } from 'components/LinkGradient'
import { H2, P } from 'components/text'
import { breakpoints } from 'const'
import { useValues } from 'kea'
import styled from 'styled-components'
import { CTAShownState } from 'types'
import { worldLogic } from 'worldLogic'

const SWrapper = styled.div`
  display: flex;
  align-items: center;
  > div:last-of-type {
    margin-left: 16px;
  }
`

interface SModalCTAProps {
  show?: boolean
  hide?: boolean
}

const SModalCTA = styled.div`
  position: absolute;
  background-color: white;
  border-radius: var(--radius);
  margin-top: 32px;
  padding: 32px 32px 16px;
  z-index: 9000;
  ${(props: SModalCTAProps) => props.show && 'animation: fadeIn 0.5s ease-in both;'}
  ${(props: SModalCTAProps) => props.hide && 'animation: fadeOut 0.5s ease-in both;'}

  @media (max-width: ${breakpoints.sm}) {
    animation: unset !important;
    bottom: 0;
    font-size: 0.85em;
    border-top: 1px solid var(--border-secondary);
    border-radius: 0;
    padding: 16px 16px 8px;
    width: calc(100% - 32px);

    a {
      padding: 7px 16px;
    }
  }
`

const SModalMobileSpacer = styled.div`
  @media (max-width: ${breakpoints.sm}) {
    @media (max-height: 572px) {
      padding-bottom: 76px; // extra space for the CTAScene.tsx
    }
  }
`

export function ModalCTA(): JSX.Element | null {
  const { ctaShownState } = useValues(worldLogic)

  if (ctaShownState === CTAShownState.Undisplayed) {
    return null
  }

  return (
    <>
      <SModalMobileSpacer />
      <SModalCTA hide={ctaShownState === CTAShownState.Hide} show={ctaShownState === CTAShownState.Show}>
        <H2>Don't have the Worldcoin app?</H2>
        <SWrapper>
          <div>
            <P>Prove unique-humanness through biometrics, privately.</P>
          </div>
          <div>
            <LinkGradient href="https://worldcoin.org/app#download" target="_blank">
              Download now
            </LinkGradient>
          </div>
        </SWrapper>
      </SModalCTA>
    </>
  )
}
