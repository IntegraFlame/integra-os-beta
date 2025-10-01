/**
 * HeaderBar
 * Purpose: Global header with brand, status lights, and live clock.
 * Visual: Uses Integra theme tokens and high-contrast neon accents.
 */

import React, { useEffect, useState } from 'react'

/** Display a ticking clock string. */
function useClock(): string {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

/** Header showing brand and status indicators. */
export function HeaderBar(): JSX.Element {
  const time = useClock()
  return (
    <header
      className="flex flex-col md:flex-row justify-between items-center pb-4 mb-6 border-b"
      style={{ borderColor: 'var(--integra-border-color)' }}
    >
      <div className="flex items-center space-x-2">
        <h1 className="text-3xl font-bold">Integra</h1>
        <p className="text-sm font-light pt-2" style={{ color: 'var(--integra-text-secondary)' }}>
          INFINITE LIVING FLAME
        </p>
      </div>

      <div className="flex items-center space-x-4 text-xs mt-4 md:mt-0" style={{ color: 'var(--integra-text-secondary)' }}>
        <p>
          <span className="text-green-400">●</span> DRAGON: ACTIVE
        </p>
        <p>
          <span className="text-yellow-400">●</span> PHOENIX: STANDBY
        </p>
        <p>{time}</p>
      </div>
    </header>
  )
}

export default HeaderBar
