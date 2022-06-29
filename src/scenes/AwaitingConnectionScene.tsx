import { IconCircleSuccess, IconHelpCircle } from 'assets/icons'
import { StealthButton } from 'components/Button'
import { LinkButton } from 'components/LinkButton'
import { QRRender } from 'components/QRRender'
import { H1, P } from 'components/text'
import { useEffect, useState } from 'preact/hooks'
import { useActions, useValues } from 'kea'
import { worldLogic } from 'worldLogic'
import styled from 'styled-components'
import { ModalView } from 'types'
import { verificationLogic } from 'verificationLogic'
import { breakpoints } from 'const'
import { LinkGradient } from 'components/LinkGradient'

const SRoot = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template:
    'title image'
    'title image'
    'title imageCopy'
    'learn learn';
  @media (max-width: ${breakpoints.sm}) {
    grid-template:
      'image'
      'title'
      'cta'
      'imageCopy';
    justify-content: center;
  }
`

const STitle = styled.div`
  grid-area: title;
  @media (max-width: ${breakpoints.sm}) {
    max-width: 340px;
  }
`

const STitlePrimary = styled(H1)`
  margin-top: 15px;
  @media (max-width: ${breakpoints.sm}) {
    margin-top: 24px;
    line-height: 32px;
    font-size: 26px;
    text-align: center;
  }
`

const STitleSecondary = styled(P)`
  margin-top: 12px;
  font-size: 16px;
  @media (max-width: ${breakpoints.sm}) {
    margin: 16px 0 32px;
    line-height: 20px;
    text-align: center;
    color: #858494;
  }
`

const SImage = styled.div`
  grid-area: image;
  @media (max-width: ${breakpoints.sm}) {
    display: grid;
    justify-content: center;
  }
`

const SFigureAction = styled.div`
  grid-area: imageCopy;
  display: grid;
  justify-content: center;
  margin-top: 16px;
  @media (max-width: ${breakpoints.sm}) {
    margin-top: 24px;
  }
`

const SCta = styled.div`
  display: none;
  grid-area: cta;
  @media (max-width: ${breakpoints.sm}) {
    order: 1;
    display: block;
    width: 100%;
    max-width: 340px;
  }
`

const SLearn = styled.div`
  grid-area: learn;
  @media (max-width: ${breakpoints.sm}) {
    display: none;
  }
`

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`

function CopyButton({ connectorUri }: { connectorUri?: string }): JSX.Element {
  const [copyButtonSuccess, setCopyButtonSuccess] = useState(false)

  useEffect(() => {
    if (copyButtonSuccess) {
      const timer = setTimeout(() => setCopyButtonSuccess(false), 2000)
      return () => clearTimeout(timer)
    }
    return () => null
  }, [copyButtonSuccess])

  const onClick = (): void => {
    if (!connectorUri) {
      return
    }
    navigator.clipboard.writeText(connectorUri)
    setCopyButtonSuccess(true)
  }

  const content: string | JSX.Element = copyButtonSuccess ? (
    <FlexCenter>
      <IconCircleSuccess style={{ marginRight: 4 }} />
      Copied!
    </FlexCenter>
  ) : (
    'Copy QR code'
  )

  return <StealthButton onClick={onClick}>{content}</StealthButton>
}

function LearnMoreLink(): JSX.Element {
  return (
    <>
      Learn more about World ID <IconHelpCircle style={{ marginLeft: 4 }} />
    </>
  )
}

export function AwaitingConnectionScene(): JSX.Element {
  const { setModalView } = useActions(worldLogic)
  const { qrCodeContent } = useValues(verificationLogic)

  return (
    <SRoot>
      <STitle>
        <STitlePrimary>Prove you haven’t done this before with World ID</STitlePrimary>
        <STitleSecondary>
          Scan or copy this QR code with your phone’s camera or the Worldcoin mobile app.
        </STitleSecondary>
      </STitle>
      <SImage>{qrCodeContent && <QRRender data={qrCodeContent} />}</SImage>
      <SFigureAction>
        <CopyButton connectorUri={qrCodeContent || ''} />
      </SFigureAction>
      <SCta>
        {/* FIXME: This should open the universal link to the app */}
        <LinkGradient href="https://worldcoin.org/download" target="_blank">
          Open Worldcoin app
        </LinkGradient>
      </SCta>
      <SLearn>
        <LinkButton onClick={() => setModalView(ModalView.LearnMore)}>
          <LearnMoreLink />
        </LinkButton>
      </SLearn>
    </SRoot>
  )
}
