import { getContext } from 'kea'
import React, { useEffect, useState } from 'react'
import { resetContext } from 'kea'

export function resetKeaStory() {
  resetContext()
  const { store } = getContext()
  store.dispatch({ type: 'storybook init' })
}

export function KeaStory({ children }) {
  const [didReset, setDidReset] = useState(false)
  useEffect(() => {
    if (!didReset) {
      resetKeaStory()
      setDidReset(true)
    }
  }, [didReset])

  return didReset ? children : null
}
