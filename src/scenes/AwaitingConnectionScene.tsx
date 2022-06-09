import { IconCircleSuccess, IconHelpCircle } from 'assets/icons'
import { Button } from 'components/Button'
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

const SWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`

const SColumn = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: ${(props) => (props.left ? 'flex-start' : undefined)};
  flex-direction: column;

  @media (max-width: ${breakpoints.sm}) {
    align-items: center;
  }
`

const SCaption = styled.p`
  margin: 14px 0;
  position: absolute;
  left: 32px;
  bottom: 0;
  button {
    color: var(--text-muted) !important;
  }

  @media (max-width: ${breakpoints.sm}) {
    position: relative;
    left: 0;
  }
`

const SCopyWrapper = styled.div`
  margin-top: 16px;
  text-align: center;
  width: 100%;
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

  return (
    <SCopyWrapper>
      <Button type="stealth" size="sm" onClick={onClick}>
        {content}
      </Button>
    </SCopyWrapper>
  )
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
    <SWrapper>
      <SColumn left>
        <H1>Prove you are a human doing this once with World ID.</H1>
        <P>Scan this QR code with your phone's camera or the Worldcoin mobile app.</P>
        <SCaption>
          <LinkButton onClick={() => setModalView(ModalView.LearnMore)}>
            <LearnMoreLink />
          </LinkButton>
        </SCaption>
      </SColumn>
      {qrCodeContent && (
        <SColumn>
          <QRRender data={qrCodeContent} />
          <CopyButton connectorUri={qrCodeContent || ''} />
        </SColumn>
      )}
    </SWrapper>
  )
}
