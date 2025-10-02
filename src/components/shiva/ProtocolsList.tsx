/**
 * ProtocolsList
 * Purpose: Expandable list of research protocols with usage meter and phases, plus bulk expand/collapse.
 */

import React, { useState } from 'react'
import type { JSX } from 'react'

/** Protocol descriptor for the list. */
export interface ProtocolSpec {
  nameHTML: string
  description: string
  status: 'Active' | 'Standby' | 'Ready'
  statusClass: string
  usageLabel: string
  usagePercent: number
  capabilities: string[]
  phases: string[]
}

/**
 * Expandable list of protocol cards with "Select All / Clear All" controls.
 */
export function ProtocolsList({ protocols }: { protocols: ProtocolSpec[] }): JSX.Element {
  const [open, setOpen] = useState<number[]>([])
  const toggle = (idx: number) =>
    setOpen((arr) => (arr.includes(idx) ? arr.filter((i) => i !== idx) : [...arr, idx]))

  const selectAll = () => setOpen(protocols.map((_, i) => i))
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

      <div className="space-y-4">
        {protocols.map((p, index) => (
          <div
            key={index}
            className="panel-inset p-4 rounded-md cursor-pointer"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-start mb-2">
              {/* Only using dangerouslySetInnerHTML for tiny inline span styling from source HTML. */}
              <h4
                className="font-bold text-sm leading-tight"
                dangerouslySetInnerHTML={{ __html: p.nameHTML }}
              />
              <span className={`status-badge ${p.statusClass}`}>{p.status}</span>
            </div>

            <p className="text-xs mb-3 text-secondary">
              {p.description}
            </p>

            <label className="text-xs font-bold">
              Usage: <span>{p.usageLabel}</span>
            </label>
            <div className="progress-bar-bg w-full h-1.5 rounded-full mt-1" aria-hidden>
              <div
                className="progress-bar-fill h-1.5 rounded-full"
                style={{ width: `${p.usagePercent}%` }}
              />
            </div>

            {open.includes(index) && (
              <div className="mt-4 space-y-2">
                <div>
                  <h5
                    className="text-xs font-bold uppercase mb-2"
                    style={{ color: 'var(--integra-interactive-blue)' }}
                  >
                    Capabilities:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {p.capabilities.map((cap) => (
                      <span key={cap} className="capability-tag text-xs px-2 py-1 rounded-md">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5
                    className="text-xs font-bold uppercase mt-3 mb-2"
                    style={{ color: 'var(--integra-interactive-blue)' }}
                  >
                    Execution Phases:
                  </h5>
                  <div className="space-y-2">
                    {p.phases.map((phase, i) => (
                      <div key={i} className="exec-phase flex items-center p-2 rounded-md">
                        <span className="exec-phase-num text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold mr-3">
                          {i + 1}
                        </span>
                        <span className="text-xs">{phase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProtocolsList
