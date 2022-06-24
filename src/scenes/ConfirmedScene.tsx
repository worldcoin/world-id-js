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
    height: calc(100vh - 88px); // 88px for header size
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
        <StatefulIcon state="success" />
      </SIconWrapper>
      <SHeader>Identity Confirmed!</SHeader>
      <SText>Yay! Your identity has been successfully confirmed. You can start using your WorldID.</SText>
      <Button color="primary" fullWidth onClick={terminate}>
        Continue
      </Button>
    </SWrapper>
  )
}
