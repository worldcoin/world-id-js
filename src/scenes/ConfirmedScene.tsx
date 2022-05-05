import { Button } from 'components/Button'
import { StatefulIcon } from 'components/StatefulIcon'
import { H2, P } from 'components/text'
import { breakpoints } from 'const'
import { useActions } from 'kea'
import styled from 'styled-components'
import { worldLogic } from 'worldLogic'

const SWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 70%;
  margin: 0 auto;
  text-align: center;
  @media (max-width: ${breakpoints.sm}) {
    height: calc(100vh - 88px); // 88px for header size
    justify-content: center;
  }
`

export function ConfirmedScene(): JSX.Element {
  const { terminate } = useActions(worldLogic)
  return (
    <SWrapper>
      <StatefulIcon state="success" />
      <H2>Verification Confirmed!</H2>
      <P>This World ID request has been confirmed successfully.</P>
      <Button block onClick={terminate}>
        Continue
      </Button>
    </SWrapper>
  )
}
