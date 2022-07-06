import { LinkGradient } from 'components/LinkGradient'
import { H2, P } from 'components/text'
import { breakpoints } from 'const'
import { useValues } from 'kea'
import styled from 'styled-components'
import { CTAShownState } from 'types'
import { worldLogic } from 'worldLogic'

const SRoot = styled.div`
  @media (max-width: ${breakpoints.sm}) {
    display: none;
  }
`

const SModalCTA = styled.div<{ show: boolean; hide: boolean }>`
  position: absolute;
  background-color: var(--bg);
  border-radius: var(--radius);
  margin-top: 8px;
  padding: 32px 32px 26px;
  z-index: 9000;
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 16px;
  align-items: center;
  ${(props) => props.show && 'animation: fadeIn 0.5s ease-in both;'};
  ${(props) => props.hide && 'animation: fadeOut 0.5s ease-in both;'};

  @media (max-width: ${breakpoints.sm}) {
    animation: unset !important;
    row-gap: 0;
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

const SHeading = styled(H2)`
  grid-column: 1 / span 2;
`

const SText = styled(P)`
  margin: 0;
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
    <SRoot>
      <SModalMobileSpacer />
      <SModalCTA hide={ctaShownState === CTAShownState.Hide} show={ctaShownState === CTAShownState.Show}>
        <SHeading>Don’t have the Worldcoin app yet?</SHeading>
        <SText>Proving unique-humanness through biometrics, without intruding privacy.</SText>
        <LinkGradient href="https://worldcoin.org/download" target="_blank">
          Install now
        </LinkGradient>
      </SModalCTA>
    </SRoot>
  )
}
