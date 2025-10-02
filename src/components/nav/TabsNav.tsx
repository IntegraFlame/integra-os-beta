/**
 * TabsNav
 * Purpose: Primary tab navigation for Home's main interface.
 */

import React from 'react'
import type { JSX } from 'react'

/** Tab keys across the app. */
export type TabKey = 'conclave' | 'archive' | 'lair' | 'journal' | 'flame' | 'monitoring'

/** Props for TabsNav. */
interface TabsNavProps {
  active: TabKey
  onChange: (key: TabKey) => void
}

/** Horizontal neon-styled tab bar. */
export function TabsNav(props: TabsNavProps): JSX.Element {
  const items: { key: TabKey; label: string; icon: string }[] = [
    { key: 'conclave', label: 'THE CONCLAVE', icon: '🏛️' },
    { key: 'archive', label: 'ARCHIVE', icon: '📚' },
    { key: 'lair', label: 'THE LAIR', icon: '🏰' },
    { key: 'journal', label: 'JOURNAL', icon: '📖' },
    { key: 'flame', label: 'THE FLAME', icon: '🔥' },
    { key: 'monitoring', label: 'MONITORING', icon: '👁️' },
  ]
  return (
    <nav className="mb-8">
      <ul
        className="flex space-x-4 md:space-x-8 text-sm font-bold overflow-x-auto pb-2 text-secondary"
      >
        {items.map((it) => (
          <li key={it.key}>
            <button
              className={`tab-link py-2 ${props.active === it.key ? 'active' : ''}`}
              onClick={() => props.onChange(it.key)}
            >
              {it.icon} {it.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TabsNav
