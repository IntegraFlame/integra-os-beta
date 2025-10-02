/**
 * EyeClarityCard
 * Purpose: Slider-like numeric controls for Shiva Action "eye clarity".
 */

import React from 'react'
import type { JSX } from 'react'

/** Clamp helper to keep values in [0, 100]. */
function clamp01(value: number): number {
  return Math.max(0, Math.min(100, value))
}

/** Descriptor for a single eye control. */
export interface EyeSpec {
  name: string
  description: string
  status: 'ACTIVE' | 'SCANNING' | 'SYNTHESIZING' | 'Ready' | 'Standby'
  statusClass: string
  model: 'neji' | 'shikamaru' | 'itachi'
  defaultClarity: number
}

/** Props for EyeClarityCard. */
interface EyeClarityCardProps {
  spec: EyeSpec
  clarity: number
  setClarity: (v: number) => void
}

/** Card with clarity step controls, input, presets, and progress bar. */
export function EyeClarityCard({ spec, clarity, setClarity }: EyeClarityCardProps): JSX.Element {
  return (
    <div className="panel-inset p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-sm">{spec.name}</h4>
        <span className={`status-badge ${spec.statusClass}`}>{spec.status}</span>
      </div>
      <p className="text-xs mt-1 text-secondary">
        {spec.description}
      </p>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold">Clarity</label>
          <div className="flex items-center space-x-2">
            <button className="control-btn w-6 h-6 rounded text-xs" onClick={() => setClarity(clamp01(clarity - 5))}>
              -5
            </button>
            <button className="control-btn w-6 h-6 rounded text-xs" onClick={() => setClarity(clamp01(clarity - 1))}>
              -1
            </button>
            <input
              type="text"
              value={clarity}
              aria-label={`${spec.name} clarity`}
              onChange={(e) => setClarity(clamp01(Number(e.target.value) || 0))}
              className="w-12 text-center text-sm bg-transparent border rounded px-1 input-integra"
            />
            <button className="control-btn w-6 h-6 rounded text-xs" onClick={() => setClarity(clamp01(clarity + 1))}>
              +1
            </button>
            <button className="control-btn w-6 h-6 rounded text-xs" onClick={() => setClarity(clamp01(clarity + 5))}>
              +5
            </button>
          </div>
        </div>

        <div className="progress-bar-bg w-full h-1.5 rounded-full mt-2" aria-hidden>
          <div className="progress-bar-fill h-1.5 rounded-full" style={{ width: `${clarity}%` }} />
        </div>

        <div className="flex space-x-2 mt-2">
          {[25, 50, 75, 100].map((p) => (
            <button key={p} className="preset-btn text-xs px-3 py-1 rounded-full flex-1" onClick={() => setClarity(p)}>
              {p}%
            </button>
          ))}
          <button className="preset-btn text-xs px-3 py-1 rounded-full flex-1" onClick={() => setClarity(spec.defaultClarity)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default EyeClarityCard
