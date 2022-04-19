import { Button } from 'components/Button'
import { Loader } from 'components/Loader'
import { H2 } from 'components/text'
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

const SLoaderWrapper = styled.div`
  font-size: 4em;
`

const SCaption = styled.div`
  text-align: center;
  margin-top: 32px;
  max-width: 60%;

  @media (max-width: ${breakpoints.sm}) {
    max-width: 100%;
  }
`

export function AwaitingVerificationScene(): JSX.Element {
  const { terminate } = useActions(worldLogic)
  return (
    <SWrapper>
      <SLoaderWrapper>
        <Loader />
      </SLoaderWrapper>
      <SCaption>
        <H2>Confirm Request</H2>
        <p>Please confirm the verification request in your Worldcoin app.</p>
        <Button block onClick={terminate} type="secondary">
          Cancel
        </Button>
      </SCaption>
    </SWrapper>
  )
}
