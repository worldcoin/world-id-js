import { IconCircleSuccess, IconFailure } from 'assets/icons'
import styled from 'styled-components'

const SStatefulIcon = styled.div`
  background-color: ${(props) => (props.state === 'success' ? 'var(--primary)' : 'var(--bg-mid)')};
  border-radius: 50%;
  color: var(--primary);
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.state === 'success' ? '3em' : '1.4em')};
  margin-bottom: 32px;
  margin-top: 16px;
`

interface StatefulIconInterface {
  state?: 'success' | 'failure'
}

export function StatefulIcon({ state = 'failure' }: StatefulIconInterface): JSX.Element {
  return (
    <SStatefulIcon state={state}>
      {state === 'failure' && <IconFailure />}
      {state === 'success' && <IconCircleSuccess style={{ color: 'transparent' }} />}
    </SStatefulIcon>
  )
}
