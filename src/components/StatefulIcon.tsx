import { IconCircleSuccess, IconFailure } from 'assets/icons'
import styled from 'styled-components'

const SStatefulIcon = styled.div`
  color: ${(props) => (props.color === 'primary' ? 'var(--statefull-primary-color)' : 'var(--statefull-color)')};
  background-color: ${(props) => (props.color === 'primary' ? 'var(--statefull-primary-bg)' : 'var(--statefull-bg)')};
  border-radius: 50%;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.state === 'success' ? '3em' : '1.4em')};
`

interface StatefulIconInterface {
  state?: 'success' | 'failure'
  color?: 'primary'
}

export function StatefulIcon({ state = 'failure', color }: StatefulIconInterface): JSX.Element {
  return (
    <SStatefulIcon state={state} color={color}>
      {state === 'failure' && <IconFailure />}
      {state === 'success' && <IconCircleSuccess style={{ color: 'transparent' }} />}
    </SStatefulIcon>
  )
}
