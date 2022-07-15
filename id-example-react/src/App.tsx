import React, { useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import worldID from '@worldcoin/id'

function App() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) {
      return
    }

    if (!worldID.isInitialized()) {
      worldID.init(ref.current, {
        enable_telemetry: true,
        action_id: 'wid_staging_PCNQeDC5CX',
        signal: 'user-id-1',
        app_name: 'candyApp',
        signal_description: 'Receive initial airdrop April 2022',
        theme: 'light',
      })
    }

    function activateWorldId() {
      // @ts-ignore
      // @ts-ignore
      worldID
        .enable()
        .then((result) => {
          console.log('Verified successfully:', result)
        })
        .catch((failure) => {
          console.warn('Verification failed:', failure)
          activateWorldId() // Re-activate so the user can try again
        })
    }

    if (!worldID.isEnabled()) {
      activateWorldId()
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>World ID React Example</p>
        {/* ADD REACT COMPONENT HERE */}

        <div ref={ref} />
        {/* <ReactWidget
          enable_telemetry={true}
          action_id="wid_staging_PCNQeDC5CX"
          signal="user-id-1"
          app_name="candyApp"
          signal_description="Receive initial airdrop April 2022"
          theme="light"
          enabled
          debug
        /> */}
      </header>
    </div>
  )
}

export default App
