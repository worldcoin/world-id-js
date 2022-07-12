// import { AppProps } from 'types'
import { styled } from '@stitches/react'
import { WorldIDBox } from './WorldIDBox'
import { Modal } from './Modal'
import { useState } from 'react'

// type Props = {
//   appProps: AppProps
//   className?: string
//   onSuccess?: () => void
//   onError?: () => void
//   enabled?: boolean
//   debug?: boolean
// }

const Wrapper = styled('div', {
  width: '100%',
  maxWidth: '300px',
})

export function Widget(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  return (
    <Wrapper>
      <WorldIDBox setIsModalVisible={setIsModalVisible} />
      <Modal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
    </Wrapper>
  )
}
