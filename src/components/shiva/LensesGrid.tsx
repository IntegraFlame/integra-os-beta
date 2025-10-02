/**
 * LensesGrid
 * Purpose: Collapsible grid of specialized lenses with capability tags and bulk expand/collapse controls.
 */

import React, { useState } from 'react'
import type { JSX } from 'react'

/** Lens metadata for the grid. */
export interface LensSpec {
  name: string
  description: string
  status: 'Ready' | 'Active' | 'Standby'
  statusClass: string
  capabilities: string[]
}

/**
 * Grid rendering with click-to-expand behavior and "Select All / Clear All" controls.
 */
export function LensesGrid({ lenses }: { lenses: LensSpec[] }): JSX.Element {
  const [open, setOpen] = useState<number[]>([])
  const toggle = (idx: number) =>
    setOpen((arr) => (arr.includes(idx) ? arr.filter((i) => i !== idx) : [...arr, idx]))

  const selectAll = () => setOpen(lenses.map((_, i) => i))
  const clearAll = () => setOpen([])

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-end gap-2 mb-2">
        <button className="sub-nav-btn rounded-md px-3 py-1 text-xs" onClick={selectAll}>
          Select All
        </button>
        <button className="sub-nav-btn rounded-md px-3 py-1 text-xs" onClick={clearAll}>
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lenses.map((lens, index) => (
          <div
            key={index}
            className="panel-inset p-4 rounded-md cursor-pointer"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm">{lens.name}</h4>
                <p className="text-xs mt-1 text-secondary">
                  {lens.description}
                </p>
              </div>
              <span className={`status-badge ${lens.statusClass}`}>{lens.status}</span>
            </div>
            {open.includes(index) && (
              <div className="mt-4 space-y-2">
                <h5
                  className="text-xs font-bold uppercase"
                  style={{ color: 'var(--integra-interactive-blue)' }}
                >
                  Capabilities:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {lens.capabilities.map((cap) => (
                    <span key={cap} className="capability-tag text-xs px-2 py-1 rounded-md">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LensesGrid
