import { Button } from 'components/Button'
import { LinkButton } from 'components/LinkButton'
import { StatefulIcon } from 'components/StatefulIcon'
import { H2 } from 'components/text'
import { breakpoints } from 'const'
import { useActions, useValues } from 'kea'
import styled from 'styled-components'
import { verificationLogic } from 'verificationLogic'
import { worldLogic } from 'worldLogic'

const SWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: ${breakpoints.sm}) {
    height: calc(100vh - 88px); // 88px for header size
    justify-content: center;
  }
`

const SCaption = styled.p`
  text-align: center;
  margin-top: 16px;
  max-width: 70%;
`

const SButtonContainer = styled.div`
  margin-top: 32px;
  width: 70%;
`

const SCancelContainer = styled.div`
  margin-top: 16px;
`

export function ErrorScene(): JSX.Element {
  const { endUserError } = useValues(verificationLogic)
  const { terminate } = useActions(worldLogic)
  const { tryAgain } = useActions(verificationLogic)

  const actionButtons = endUserError?.noRetry ? (
    <Button onClick={terminate} block>
      Close
    </Button>
  ) : (
    <>
      <SButtonContainer>
        <Button onClick={tryAgain} block>
          Try again
        </Button>
      </SButtonContainer>
      <SCancelContainer>
        <LinkButton onClick={terminate}>Cancel</LinkButton>
      </SCancelContainer>
    </>
  )

  return (
    <SWrapper>
      <StatefulIcon />
      <H2>{endUserError?.title || 'Something went wrong!'}</H2>
      <SCaption>{endUserError?.caption || 'Sorry, there was a problem with your request, please try again.'}</SCaption>
      {actionButtons}
    </SWrapper>
  )
}
