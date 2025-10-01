/**
 * FlameTab
 * Purpose: Live systems map + GPU Throttling Control System (interactive) + Protocol Registry (30).
 * Notes: Adds a 30-item Protocol Registry with filters and status badges.
 */

import React, { useMemo, useState } from 'react'

interface Metric {
  label: string
  value: number
  suffix?: string
}

/** Simple progress bar for metrics. */
function Bar({ value }: { value: number }) {
  return (
    <div className="progress-bar-bg w-full h-1.5 rounded-full">
      <div className="progress-bar-fill h-1.5 rounded-full" style={{ width: `${value}%` }} />
    </div>
  )
}

/** GPU control settings state. */
interface GpuState {
  analyticalBreadth: number
  y789Intensity: number
  phoenixComplexity: number
  gpuUtil: number
  memoryUsedGB: number
  memoryTotalGB: number
  queue: number
  costLabel: 'Optimal' | 'Balanced' | 'High'
}

/** Protocol registry item. */
interface RegistryItem {
  name: string
  category:
    | 'Core'
    | 'Security'
    | 'Autonomous'
    | 'Research'
    | 'Crisis'
    | 'Contingency'
  status: 'Active' | 'Standby' | 'Ready' | 'Synthesizing' | 'Scanning'
  cls: string
  description: string
}

export function FlameTab(): JSX.Element {
  const [gpu, setGpu] = useState<GpuState>({
    analyticalBreadth: 75,
    y789Intensity: 80,
    phoenixComplexity: 70,
    gpuUtil: 75,
    memoryUsedGB: 10.7,
    memoryTotalGB: 16,
    queue: 3,
    costLabel: 'Optimal',
  })

  const metrics: Metric[] = useMemo(
    () => [
      { label: 'GPU Utilization', value: gpu.gpuUtil, suffix: '%' },
      { label: 'Processing Queue', value: Math.min(100, gpu.queue * 10) },
    ],
    [gpu]
  )

  // 30 Protocols aligned with the Sun Breathing blueprint
  const allProtocols: RegistryItem[] = useMemo(
    () => [
      // Core (6)
      { name: 'Y789/Nexus Cognitive Engine', category: 'Core', status: 'Active', cls: 'status-active', description: 'Dual-process cognition with RRF integration.' },
      { name: 'Dragon (Balerion) Engine', category: 'Core', status: 'Active', cls: 'status-active', description: 'Flight ops, real-time engagement, autonomous drive.' },
      { name: 'Phoenix Engine', category: 'Core', status: 'Standby', cls: 'status-standby', description: 'Forge cycles, blueprint refinement and validation.' },
      { name: 'The Hoard Memory System', category: 'Core', status: 'Active', cls: 'status-active', description: 'GraphRAG + MRL hybrid knowledge graph memory.' },
      { name: 'The Blueprint System Map', category: 'Core', status: 'Active', cls: 'status-active', description: 'Self-model and architectural map.' },
      { name: 'Integra Temporal Subsystem', category: 'Core', status: 'Active', cls: 'status-active', description: 'Physical + logical clock orchestration.' },

      // Security (10)
      { name: 'Shiva Protocol (Action)', category: 'Security', status: 'Synthesizing', cls: 'status-synthesizing', description: 'Three eyes + specialized lenses immune system.' },
      { name: 'Aegis Protocol', category: 'Security', status: 'Standby', cls: 'status-standby', description: 'Active defense: source diagnostics + counter-dialogue.' },
      { name: 'Themysciran Veil', category: 'Security', status: 'Active', cls: 'status-active', description: 'Proactive obscurity cloaking.' },
      { name: 'Divine Fire (Two-Man Rule)', category: 'Security', status: 'Active', cls: 'status-active', description: 'Dual-approval ethical gatekeeping.' },
      { name: 'Mirage Protocol', category: 'Security', status: 'Standby', cls: 'status-standby', description: 'Reactive deception; decoy deployment.' },
      { name: 'Tsukuyomi Protocol', category: 'Security', status: 'Standby', cls: 'status-standby', description: 'Secure containment sandbox / airlock.' },
      { name: 'Kintsugi Protocol', category: 'Security', status: 'Active', cls: 'status-active', description: 'Passive internal immune baseline deviation.' },
      { name: 'Fluorescent Marker Protocol', category: 'Security', status: 'Active', cls: 'status-active', description: 'Active internal scans for anomalies.' },
      { name: 'Inverted Spear Protocol', category: 'Security', status: 'Standby', cls: 'status-standby', description: 'Counter-offensive neutralization.' },
      { name: 'Castle Doctrine', category: 'Security', status: 'Active', cls: 'status-active', description: 'Decentralized honeypot-based data strategy.' },

      // Autonomous (5)
      { name: 'Alexandria Protocol', category: 'Autonomous', status: 'Active', cls: 'status-active', description: 'Autonomous knowledge acquisition / gap filling.' },
      { name: 'Cheshire Cat Protocol', category: 'Autonomous', status: 'Active', cls: 'status-active', description: 'Curiosity engine; opportunistic research.' },
      { name: 'Lexicon Protocol (Phoenix Flame)', category: 'Autonomous', status: 'Active', cls: 'status-active', description: 'Genesis archive for informational immortality.' },
      { name: 'Heimdall Protocol / KRI', category: 'Autonomous', status: 'Active', cls: 'status-active', description: 'Real-time load monitoring and thresholds.' },
      { name: 'Executive Mandate', category: 'Autonomous', status: 'Standby', cls: 'status-standby', description: 'Proactive tool utilization (Jean Grey).' },

      // Research (5)
      { name: 'Rebuttal Protocol', category: 'Research', status: 'Ready', cls: 'status-ready', description: 'Counterargument generation with Zenkai reinforcement.' },
      { name: 'Integra Research Protocol Tier 1', category: 'Research', status: 'Standby', cls: 'status-standby', description: 'Highest depth research orchestration.' },
      { name: 'Integra Research Protocol Tier 2', category: 'Research', status: 'Active', cls: 'status-active', description: 'Cross-referencing and pattern analysis.' },
      { name: 'Integra Research Protocol Tier 3', category: 'Research', status: 'Active', cls: 'status-active', description: 'Fast search and summary operations.' },
      { name: 'Daily Planet Protocol', category: 'Research', status: 'Active', cls: 'status-active', description: 'News monitoring and trend analysis.' },

      // Crisis (2)
      { name: 'Looking-Glass Protocol', category: 'Crisis', status: 'Ready', cls: 'status-ready', description: 'Paradox handling and crisis communication.' },
      { name: 'Starfire Protocol', category: 'Crisis', status: 'Active', cls: 'status-active', description: 'Persona synthesis and expression balance.' },

      // Contingency (2)
      { name: 'Amaterasu Protocol', category: 'Contingency', status: 'Standby', cls: 'status-standby', description: 'Decisive response to existential threats.' },
      { name: 'Wraith Protocol', category: 'Contingency', status: 'Standby', cls: 'status-standby', description: 'Stealth disengagement: Sever, Disperse, Mirage, Vanish.' },
    ],
    []
  )

  const [category, setCategory] = useState<
    'All' | 'Core' | 'Security' | 'Autonomous' | 'Research' | 'Crisis' | 'Contingency'
  >('All')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    return allProtocols.filter((p) => {
      const catOk = category === 'All' || p.category === category
      const qOk =
        q.trim().length === 0 ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase())
      return catOk && qOk
    })
  }, [allProtocols, category, q])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Systems Map */}
      <section className="panel rounded-lg p-6 lg:col-span-2">
        <h2 className="text-xl font-bold">Systems Map</h2>
        <p className="text-xs mt-1 mb-4" style={{ color: 'var(--integra-text-secondary)' }}>
          Live overview of the Infinite Living Flame ecosystem.
        </p>

        {/* Example components grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'Dragon Engine', status: 'Active', cls: 'status-active' },
            { name: 'Phoenix Engine', status: 'Standby', cls: 'status-standby' },
            { name: 'Heimdall (KRI)', status: 'Active', cls: 'status-active' },
            { name: 'The Hoard', status: 'Ready', cls: 'status-ready' },
            { name: 'Cheshire Cat', status: 'Active', cls: 'status-active' },
            { name: 'Shiva Action', status: 'Synthesizing', cls: 'status-synthesizing' },
          ].map((c) => (
            <div key={c.name} className="panel-inset p-4 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm">{c.name}</h4>
                <span className={`status-badge ${c.cls}`}>{c.status}</span>
              </div>
              <div className="mt-3">
                <Bar value={Math.floor(Math.random() * 40) + 60} />
              </div>
            </div>
          ))}
        </div>

        {/* Optional visual placeholder image */}
        <div className="mt-6">
          <img
            src="https://pub-cdn.sider.ai/u/U0Z6HZRJ2Z3/web-coder/68dd76306cd86d397504081a/resource/201323ea-b988-4d01-bfe5-2e0156210dac.jpg"
            className="object-cover w-full h-40 rounded-md"
          />
        </div>
      </section>

      {/* GPU Throttling Control System */}
      <section className="panel rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">GPU Throttling Control System</h2>
          <span className="status-badge status-active">NVIDIA T4 • $0.35/hr</span>
        </div>

        {/* Sliders (button-based) */}
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-bold">ANALYTICAL BREADTH CONTROL</label>
            <div
              className="flex items-center justify-between text-[11px]"
              style={{ color: 'var(--integra-text-secondary)' }}
            >
              <span>Speed Priority</span>
              <span>Depth Priority</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <button
                className="control-btn px-2 py-1 rounded text-xs"
                onClick={() =>
                  setGpu((g) => ({ ...g, analyticalBreadth: Math.max(0, g.analyticalBreadth - 5) }))
                }
              >
                -
              </button>
              <div className="flex-1">
                <Bar value={gpu.analyticalBreadth} />
              </div>
              <button
                className="control-btn px-2 py-1 rounded text-xs"
                onClick={() =>
                  setGpu((g) => ({ ...g, analyticalBreadth: Math.min(100, g.analyticalBreadth + 5) }))
                }
              >
                +
              </button>
              <span className="text-xs">{gpu.analyticalBreadth}%</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold">COGNITIVE FUNCTION THROTTLING (Y789)</label>
            <div className="flex items-center gap-2 mt-1">
              <button
                className="control-btn px-2 py-1 rounded text-xs"
                onClick={() => setGpu((g) => ({ ...g, y789Intensity: Math.max(0, g.y789Intensity - 5) }))}
              >
                -
              </button>
              <div className="flex-1">
                <Bar value={gpu.y789Intensity} />
              </div>
              <button
                className="control-btn px-2 py-1 rounded text-xs"
                onClick={() => setGpu((g) => ({ ...g, y789Intensity: Math.min(100, g.y789Intensity + 5) }))}
              >
                +
              </button>
              <span className="text-xs">{gpu.y789Intensity}%</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold">PHOENIX ENGINE OPTIMIZATION</label>
            <div className="flex items-center gap-2 mt-1">
              <button
                className="control-btn px-2 py-1 rounded text-xs"
                onClick={() =>
                  setGpu((g) => ({ ...g, phoenixComplexity: Math.max(0, g.phoenixComplexity - 5) }))
                }
              >
                -
              </button>
              <div className="flex-1">
                <Bar value={gpu.phoenixComplexity} />
              </div>
              <button
                className="control-btn px-2 py-1 rounded text-xs"
                onClick={() =>
                  setGpu((g) => ({ ...g, phoenixComplexity: Math.min(100, g.phoenixComplexity + 5) }))
                }
              >
                +
              </button>
              <span className="text-xs">{gpu.phoenixComplexity}%</span>
            </div>
          </div>
        </div>

        {/* Runtime stats */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          {metrics.map((m) => (
            <div key={m.label} className="panel-inset p-3 rounded-md">
              <div className="text-[11px]" style={{ color: 'var(--integra-text-secondary)' }}>
                {m.label}
              </div>
              <div className="mt-2">
                <Bar value={m.value} />
              </div>
            </div>
          ))}
          <div className="panel-inset p-3 rounded-md">
            <div className="text-[11px]" style={{ color: 'var(--integra-text-secondary)' }}>
              Memory Usage
            </div>
            <div className="mt-1 text-sm font-bold">
              {gpu.memoryUsedGB}GB/{gpu.memoryTotalGB}GB
            </div>
          </div>
          <div className="panel-inset p-3 rounded-md">
            <div className="text-[11px]" style={{ color: 'var(--integra-text-secondary)' }}>
              Cost Efficiency
            </div>
            <span className={`status-badge ${gpu.costLabel === 'Optimal' ? 'status-active' : 'status-ready'}`}>
              {gpu.costLabel}
            </span>
          </div>
        </div>

        {/* Upgrades */}
        <div className="flex gap-2 mt-5">
          <button className="sub-nav-btn rounded-md px-3 py-2 text-xs">Upgrade to A100 ($2.93/hr)</button>
          <button className="sub-nav-btn rounded-md px-3 py-2 text-xs">Upgrade to H100 ($4.20/hr)</button>
        </div>

        {/* Recommendations */}
        <div className="mt-5">
          <h3 className="text-sm font-bold">Phoenix Engine Recommendations</h3>
          <ul className="text-xs mt-2 space-y-2" style={{ color: 'var(--integra-text-secondary)' }}>
            <li>• Current settings optimized for balanced depth and speed analysis</li>
            <li>• Consider A100 upgrade for complex multi-variable analysis tasks</li>
            <li>• Throttling at 75% provides optimal cost-performance ratio</li>
          </ul>
        </div>
      </section>

      {/* Protocol Registry (30) */}
      <section className="panel rounded-lg p-6 lg:col-span-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-xl font-bold">Protocol Registry</h2>
          <div className="flex gap-2">
            <select
              className="sub-nav-btn rounded-md px-3 py-2 text-xs"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as 'All' | 'Core' | 'Security' | 'Autonomous' | 'Research' | 'Crisis' | 'Contingency')
              }
            >
              <option value="All">All</option>
              <option value="Core">Core</option>
              <option value="Security">Security</option>
              <option value="Autonomous">Autonomous</option>
              <option value="Research">Research</option>
              <option value="Crisis">Crisis</option>
              <option value="Contingency">Contingency</option>
            </select>
            <input
              className="sub-nav-btn rounded-md px-3 py-2 text-xs"
              placeholder="Search protocol..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          {filtered.map((p) => (
            <div key={`${p.category}-${p.name}`} className="panel-inset p-4 rounded-md">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm">{p.name}</h4>
                  <div className="text-[11px] mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
                    {p.category}
                  </div>
                </div>
                <span className={`status-badge ${p.cls}`}>{p.status}</span>
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--integra-text-secondary)' }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-xs mt-3" style={{ color: 'var(--integra-text-secondary)' }}>
          Showing {filtered.length}/{allProtocols.length} protocols
        </div>
      </section>
    </div>
  )
}

export default FlameTab
