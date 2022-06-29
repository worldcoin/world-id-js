import { Button } from 'components/Button'
import { StatefulIcon } from 'components/StatefulIcon'
import { H3, P } from 'components/text'
import { breakpoints } from 'const'
import { useActions } from 'kea'
import styled from 'styled-components'
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
  max-width: 290px;
  @media (max-width: ${breakpoints.sm}) {
    max-width: none;
  }
`

export function ConfirmedScene(): JSX.Element {
  const { terminate } = useActions(worldLogic)
  return (
    <SWrapper>
      <SIconWrapper>
        <StatefulIcon state="success" color="primary" />
      </SIconWrapper>
      <SHeader>Verification Confirmed!</SHeader>
      <SText>Great! This World ID request has been successfully confirmed.</SText>
      <Button color="primary" block onClick={terminate}>
        Continue
      </Button>
    </SWrapper>
  )
}
