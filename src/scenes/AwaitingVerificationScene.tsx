import { Button } from 'components/Button'
import { Loader } from 'components/Loader'
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

const SLoaderWrapper = styled.div`
  margin: 72px 0 72px 0;
  font-size: 4em;
`

const SHeader = styled(H3)`
  text-align: center;
`

const SText = styled(P)`
  margin-top: 8px;
  margin-bottom: 24px;
  text-align: center;
  max-width: 240px;
  @media (max-width: ${breakpoints.sm}) {
    max-width: none;
  }
`

export function AwaitingVerificationScene(): JSX.Element {
  const { terminate } = useActions(worldLogic)
  return (
    <SWrapper>
      <SLoaderWrapper>
        <Loader />
      </SLoaderWrapper>
      <SHeader>Confirm Request</SHeader>
      <SText>Please confirm the request in your Worldcoin app.</SText>
      <Button block onClick={terminate}>
        Cancel
      </Button>
    </SWrapper>
  )
}
