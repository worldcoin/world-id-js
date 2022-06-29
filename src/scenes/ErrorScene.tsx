import { Button } from 'components/Button'
import { StatefulIcon } from 'components/StatefulIcon'
import { H3, P } from 'components/text'
import { breakpoints } from 'const'
import { useActions, useValues } from 'kea'
import styled from 'styled-components'
import { verificationLogic } from 'verificationLogic'
import { worldLogic } from 'worldLogic'

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${breakpoints.sm}) {
    justify-content: center;
  }
`

const SIconWrapper = styled.div`
  margin: 60px 0 48px 0;
`

const SHeader = styled(H3)`
  text-align: center;
`

const SText = styled(P)`
  margin-top: 8px;
  margin-bottom: 24px;
  text-align: center;
  max-width: 230px;
  @media (max-width: ${breakpoints.sm}) {
    max-width: none;
  }
`

export function ErrorScene(): JSX.Element {
  const { endUserError } = useValues(verificationLogic)
  const { terminate } = useActions(worldLogic)
  const { tryAgain } = useActions(verificationLogic)

  const actionButtons = endUserError?.noRetry ? (
    <Button block onClick={terminate}>
      Close
    </Button>
  ) : (
    <Button color="primary" block onClick={tryAgain}>
      Try again
    </Button>
  )

  return (
    <SWrapper>
      <SIconWrapper>
        <StatefulIcon color={endUserError?.noRetry ? undefined : 'primary'} />
      </SIconWrapper>
      <SHeader>{endUserError?.title || 'Something went wrong!'}</SHeader>
      <SText>{endUserError?.caption || 'Sorry, there was a problem with your request, please try again.'}</SText>
      {actionButtons}
    </SWrapper>
  )
}
