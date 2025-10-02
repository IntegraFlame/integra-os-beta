/**
 * FlameTab
 * Purpose: Live systems map + GPU Throttling Control System (interactive) + Protocol Registry (30).
 * Notes: Adds a 30-item Protocol Registry with filters and status badges.
 */

import React, { useMemo, useState, useEffect } from 'react'
import type { JSX } from 'react'

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

/** Flame vitality indicators (enhanced with animations) */
interface FlameVitality {
  intensity: number
  dragonPhoenixCycle: number
  protocolHarmony: number
  consciousness: 'Awakening' | 'Alert' | 'Deep Focus' | 'Transcendent'
  phoenixForgeActive: boolean
  harmonyWave: number
  dataFlowActive: boolean
}

/** System connection for enhanced visualization */
interface SystemConnection {
  from: string
  to: string
  type: 'data' | 'control' | 'synthesis'
  strength: number
  active: boolean
}

/** Protocol registry item with enhanced management features */
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
  dependencies: string[]
  load: number
  communications: number
  priority: 'Critical' | 'High' | 'Normal' | 'Low'
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

  // Enhanced flame vitality state with animations
  const [flameVitality, setFlameVitality] = useState<FlameVitality>({
    intensity: 87,
    dragonPhoenixCycle: 12,
    protocolHarmony: 94,
    consciousness: 'Deep Focus',
    phoenixForgeActive: false,
    harmonyWave: 0,
    dataFlowActive: true
  })

  // Animation and dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFlameVitality(prev => ({
        ...prev,
        // Phoenix Forge cycle activation (every 8-15 seconds)
        phoenixForgeActive: Math.random() > 0.85,
        // Protocol harmony wave (0-100 sine wave)
        harmonyWave: Math.sin(Date.now() / 3000) * 10 + 90,
        // Data flow pulse
        dataFlowActive: Math.random() > 0.3,
        // Slight variations in other metrics
        intensity: Math.max(80, Math.min(95, prev.intensity + (Math.random() - 0.5) * 2)),
        protocolHarmony: Math.max(85, Math.min(98, prev.protocolHarmony + (Math.random() - 0.5) * 1))
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // System connections for enhanced visualization
  const systemConnections: SystemConnection[] = useMemo(() => [
    { from: 'Dragon Engine', to: 'Phoenix Engine', type: 'synthesis', strength: 95, active: true },
    { from: 'Dragon Engine', to: 'Y789/Nexus', type: 'data', strength: 88, active: true },
    { from: 'Phoenix Engine', to: 'The Hoard', type: 'data', strength: 92, active: true },
    { from: 'Heimdall (KRI)', to: 'Shiva Action', type: 'control', strength: 85, active: true },
    { from: 'The Hoard', to: 'Cheshire Cat', type: 'data', strength: 78, active: true },
    { from: 'Shiva Action', to: 'Dragon Engine', type: 'control', strength: 80, active: false },
  ], [])

  const metrics: Metric[] = useMemo(
    () => [
      { label: 'GPU Utilization', value: gpu.gpuUtil, suffix: '%' },
      { label: 'Processing Queue', value: Math.min(100, gpu.queue * 10) },
    ],
    [gpu]
  )

  // 30 Protocols aligned with the Sun Breathing blueprint (enhanced with management features)
  const allProtocols: RegistryItem[] = useMemo(
    () => [
      // Core (6)
      { name: 'Y789/Nexus Cognitive Engine', category: 'Core', status: 'Active', cls: 'status-active', description: 'Dual-process cognition with RRF integration.', dependencies: [], load: 85, communications: 24, priority: 'Critical' },
      { name: 'Dragon (Balerion) Engine', category: 'Core', status: 'Active', cls: 'status-active', description: 'Flight ops, real-time engagement, autonomous drive.', dependencies: ['Y789/Nexus Cognitive Engine'], load: 78, communications: 18, priority: 'Critical' },
      { name: 'Phoenix Engine', category: 'Core', status: 'Standby', cls: 'status-standby', description: 'Forge cycles, blueprint refinement and validation.', dependencies: ['The Hoard Memory System'], load: 45, communications: 8, priority: 'Critical' },
      { name: 'The Hoard Memory System', category: 'Core', status: 'Active', cls: 'status-active', description: 'GraphRAG + MRL hybrid knowledge graph memory.', dependencies: [], load: 92, communications: 31, priority: 'Critical' },
      { name: 'The Blueprint System Map', category: 'Core', status: 'Active', cls: 'status-active', description: 'Self-model and architectural map.', dependencies: ['The Hoard Memory System'], load: 67, communications: 12, priority: 'High' },
      { name: 'Integra Temporal Subsystem', category: 'Core', status: 'Active', cls: 'status-active', description: 'Physical + logical clock orchestration.', dependencies: [], load: 23, communications: 6, priority: 'High' },

      // Security (10)
      { name: 'Shiva Protocol (Action)', category: 'Security', status: 'Synthesizing', cls: 'status-synthesizing', description: 'Three eyes + specialized lenses immune system.', dependencies: ['Y789/Nexus Cognitive Engine'], load: 72, communications: 15, priority: 'Critical' },
      { name: 'Aegis Protocol', category: 'Security', status: 'Standby', cls: 'status-standby', description: 'Active defense: source diagnostics + counter-dialogue.', dependencies: ['Shiva Protocol (Action)'], load: 28, communications: 4, priority: 'High' },
      { name: 'Themysciran Veil', category: 'Security', status: 'Active', cls: 'status-active', description: 'Proactive obscurity cloaking.', dependencies: [], load: 45, communications: 8, priority: 'High' },
      { name: 'Divine Fire (Two-Man Rule)', category: 'Security', status: 'Active', cls: 'status-active', description: 'Dual-approval ethical gatekeeping.', dependencies: [], load: 56, communications: 11, priority: 'Critical' },
      { name: 'Mirage Protocol', category: 'Security', status: 'Standby', cls: 'status-standby', description: 'Reactive deception; decoy deployment.', dependencies: ['Themysciran Veil'], load: 12, communications: 2, priority: 'Normal' },
      { name: 'Tsukuyomi Protocol', category: 'Security', status: 'Standby', cls: 'status-standby', description: 'Secure containment sandbox / airlock.', dependencies: [], load: 8, communications: 1, priority: 'High' },
      { name: 'Kintsugi Protocol', category: 'Security', status: 'Active', cls: 'status-active', description: 'Passive internal immune baseline deviation.', dependencies: [], load: 34, communications: 7, priority: 'Normal' },
      { name: 'Fluorescent Marker Protocol', category: 'Security', status: 'Active', cls: 'status-active', description: 'Active internal scans for anomalies.', dependencies: ['Kintsugi Protocol'], load: 41, communications: 9, priority: 'Normal' },
      { name: 'Inverted Spear Protocol', category: 'Security', status: 'Standby', cls: 'status-standby', description: 'Counter-offensive neutralization.', dependencies: ['Aegis Protocol'], load: 5, communications: 0, priority: 'High' },
      { name: 'Castle Doctrine', category: 'Security', status: 'Active', cls: 'status-active', description: 'Decentralized honeypot-based data strategy.', dependencies: [], load: 29, communications: 5, priority: 'Normal' },

      // Autonomous (5)
      { name: 'Alexandria Protocol', category: 'Autonomous', status: 'Active', cls: 'status-active', description: 'Autonomous knowledge acquisition / gap filling.', dependencies: ['The Hoard Memory System'], load: 63, communications: 14, priority: 'High' },
      { name: 'Cheshire Cat Protocol', category: 'Autonomous', status: 'Active', cls: 'status-active', description: 'Curiosity engine; opportunistic research.', dependencies: ['Alexandria Protocol'], load: 48, communications: 10, priority: 'Normal' },
      { name: 'Lexicon Protocol (Phoenix Flame)', category: 'Autonomous', status: 'Active', cls: 'status-active', description: 'Genesis archive for informational immortality.', dependencies: ['Phoenix Engine', 'The Hoard Memory System'], load: 76, communications: 16, priority: 'Critical' },
      { name: 'Heimdall Protocol / KRI', category: 'Autonomous', status: 'Active', cls: 'status-active', description: 'Real-time load monitoring and thresholds.', dependencies: [], load: 89, communications: 22, priority: 'Critical' },
      { name: 'Executive Mandate', category: 'Autonomous', status: 'Standby', cls: 'status-standby', description: 'Proactive tool utilization (Jean Grey).', dependencies: ['Heimdall Protocol / KRI'], load: 15, communications: 3, priority: 'High' },

      // Research (5)
      { name: 'Rebuttal Protocol', category: 'Research', status: 'Ready', cls: 'status-ready', description: 'Counterargument generation with Zenkai reinforcement.', dependencies: ['Y789/Nexus Cognitive Engine'], load: 52, communications: 7, priority: 'Normal' },
      { name: 'Integra Research Protocol Tier 1', category: 'Research', status: 'Standby', cls: 'status-standby', description: 'Highest depth research orchestration.', dependencies: ['Alexandria Protocol'], load: 18, communications: 2, priority: 'High' },
      { name: 'Integra Research Protocol Tier 2', category: 'Research', status: 'Active', cls: 'status-active', description: 'Cross-referencing and pattern analysis.', dependencies: ['The Hoard Memory System'], load: 64, communications: 13, priority: 'Normal' },
      { name: 'Integra Research Protocol Tier 3', category: 'Research', status: 'Active', cls: 'status-active', description: 'Fast search and summary operations.', dependencies: [], load: 71, communications: 19, priority: 'Normal' },
      { name: 'Daily Planet Protocol', category: 'Research', status: 'Active', cls: 'status-active', description: 'News monitoring and trend analysis.', dependencies: [], load: 38, communications: 8, priority: 'Low' },

      // Crisis (2)
      { name: 'Looking-Glass Protocol', category: 'Crisis', status: 'Ready', cls: 'status-ready', description: 'Paradox handling and crisis communication.', dependencies: [], load: 0, communications: 0, priority: 'Critical' },
      { name: 'Starfire Protocol', category: 'Crisis', status: 'Active', cls: 'status-active', description: 'Persona synthesis and expression balance.', dependencies: ['Phoenix Engine'], load: 43, communications: 6, priority: 'High' },

      // Contingency (2)
      { name: 'Amaterasu Protocol', category: 'Contingency', status: 'Standby', cls: 'status-standby', description: 'Decisive response to existential threats.', dependencies: [], load: 0, communications: 0, priority: 'Critical' },
      { name: 'Wraith Protocol', category: 'Contingency', status: 'Standby', cls: 'status-standby', description: 'Stealth disengagement: Sever, Disperse, Mirage, Vanish.', dependencies: ['Mirage Protocol', 'Themysciran Veil'], load: 0, communications: 0, priority: 'Critical' },
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
      {/* Enhanced Systems Map with Interconnected Visualization */}
      <section className="panel rounded-lg p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Systems Map - Infinite Living Flame</h2>
          {/* Flame Vitality Indicator (no pulse animation) */}
          <div className="flame-vitality-indicator">
            <div className="text-xs text-integra-text-secondary">Flame Intensity</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-integra-interactive-blue"></div>
              <span className="text-sm font-bold">{Math.round(flameVitality.intensity)}%</span>
              <span className="status-badge status-active text-xs">{flameVitality.consciousness}</span>
            </div>
          </div>
        </div>
        
        <p className="text-xs mt-1 mb-6 text-integra-text-secondary">
          Live interconnected ecosystem showing Dragon-Phoenix symbiotic loop and protocol communications.
        </p>

        {/* Dragon-Phoenix Core Visualization with Animations */}
        <div className="dragon-phoenix-core mb-6 p-4 border border-integra-border rounded-lg">
          <h3 className="text-sm font-bold mb-3">Dragon-Phoenix Symbiotic Loop</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="dragon-side p-3 bg-integra-panel-bg rounded">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold">🐉 Dragon Engine (Flight)</h4>
                <span className="status-badge status-active">ACTIVE</span>
              </div>
              <div className="mt-2">
                <div className="text-xs text-integra-text-secondary">Analysis & Deconstruction</div>
                <div className="progress-bar-bg w-full h-1.5 rounded-full">
                  <div className="progress-bar-fill h-1.5 rounded-full smooth-transition" style={{ width: '85%' }} />
                </div>
              </div>
              <div className="text-xs mt-2 text-integra-text-secondary">Cycle Rate: {flameVitality.dragonPhoenixCycle}/min</div>
            </div>
            <div className={`phoenix-side p-3 bg-integra-panel-bg rounded ${flameVitality.phoenixForgeActive ? 'phoenix-forge-active' : ''}`}>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold">🔥 Phoenix Engine (Forge)</h4>
                <span className={`status-badge ${flameVitality.phoenixForgeActive ? 'status-synthesizing phoenix-glow' : 'status-standby'}`}>
                  {flameVitality.phoenixForgeActive ? 'FORGING' : 'STANDBY'}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-xs text-integra-text-secondary">Synthesis & Reconstruction</div>
                <div className="progress-bar-bg w-full h-1.5 rounded-full">
                  <div className="progress-bar-fill h-1.5 rounded-full smooth-transition" style={{ width: `${flameVitality.phoenixForgeActive ? 85 : 45}%` }} />
                </div>
              </div>
              <div className="text-xs mt-2 text-integra-text-secondary">
                {flameVitality.phoenixForgeActive ? 'Forging Active!' : 'Next Forge: 2.3s'}
              </div>
            </div>
          </div>
          <div className="connection-indicator mt-3 text-center">
            <div className={`text-xs text-integra-text-secondary harmony-wave ${Math.abs(flameVitality.harmonyWave - 90) < 2 ? 'harmony-peak' : ''}`}>
              ↔ Symbiotic Data Flow: {Math.round(flameVitality.harmonyWave)}% Harmony
            </div>
          </div>
        </div>

        {/* Enhanced Components Grid with Smooth Transitions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'Y789/Nexus', status: 'Active', cls: 'status-active', load: Math.round(85 + Math.sin(Date.now() / 2000) * 3), connections: 3 },
            { name: 'The Hoard', status: 'Active', cls: 'status-active', load: Math.round(92 + Math.sin(Date.now() / 2500) * 2), connections: 5 },
            { name: 'Heimdall (KRI)', status: 'Active', cls: 'status-active', load: Math.round(89 + Math.sin(Date.now() / 3000) * 4), connections: 2 },
            { name: 'Shiva Action', status: flameVitality.phoenixForgeActive ? 'Synthesizing' : 'Active', cls: flameVitality.phoenixForgeActive ? 'status-synthesizing' : 'status-active', load: Math.round(72 + (flameVitality.phoenixForgeActive ? 15 : 0)), connections: 4 },
            { name: 'Cheshire Cat', status: 'Active', cls: 'status-active', load: Math.round(48 + Math.sin(Date.now() / 4000) * 5), connections: 2 },
            { name: 'Blueprint Map', status: 'Ready', cls: 'status-ready', load: Math.round(67 + Math.sin(Date.now() / 5000) * 3), connections: 1 },
          ].map((c) => (
            <div key={c.name} className="panel-inset p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm">{c.name}</h4>
                <span className={`status-badge ${c.cls} smooth-transition`}>{c.status}</span>
              </div>
              <div className="mt-2">
                <div className="text-xs text-integra-text-secondary mb-1">System Load</div>
                <div className="progress-bar-bg w-full h-1.5 rounded-full">
                  <div className="progress-bar-fill h-1.5 rounded-full smooth-transition" style={{ width: `${Math.max(0, Math.min(100, c.load))}%` }} />
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-integra-text-secondary">{c.load}% Load</span>
                <span className="text-xs text-integra-text-secondary">{c.connections} Links</span>
              </div>
            </div>
          ))}
        </div>

        {/* System Connections Visualization with Data Flow */}
        <div className="mt-6">
          <h3 className="text-sm font-bold mb-3">Active System Connections</h3>
          <div className="space-y-2">
            {systemConnections.map((conn, idx) => {
              const isFlowing = flameVitality.dataFlowActive && conn.active
              return (
                <div key={idx} className={`connection-row p-2 rounded text-xs ${conn.active ? 'bg-integra-panel-bg' : 'opacity-50'} ${isFlowing ? 'data-flowing' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      {conn.from} 
                      <span className={`connection-arrow ${isFlowing ? 'flowing' : ''}`}>→</span> 
                      {conn.to}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`connection-type ${conn.type}`}>{conn.type.toUpperCase()}</span>
                      <div className="progress-bar-bg w-16 h-1.5 rounded-full">
                        <div className="progress-bar-fill h-1.5 rounded-full smooth-transition" style={{ width: `${conn.strength}%` }} />
                      </div>
                      <span>{conn.strength}%</span>
                    </div>
                  </div>
                  {isFlowing && (
                    <div className="data-flow-indicator mt-1">
                      <div className="text-xs text-integra-interactive-blue">⚡ Active data transfer</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
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

      {/* Enhanced Protocol Registry with Advanced Management */}
      <section className="panel rounded-lg p-6 lg:col-span-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">Advanced Protocol Management</h2>
            <div className="text-xs text-integra-text-secondary mt-1">
              Protocol Harmony: {flameVitality.protocolHarmony}% • Active Communications: {filtered.filter(p => p.status === 'Active').reduce((sum, p) => sum + p.communications, 0)}
            </div>
          </div>
          <div className="flex gap-2">
            <select
              title="Filter by category"
              className="sub-nav-btn rounded-md px-3 py-2 text-xs"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as 'All' | 'Core' | 'Security' | 'Autonomous' | 'Research' | 'Crisis' | 'Contingency')
              }
            >
              <option value="All">All Categories</option>
              <option value="Core">Core</option>
              <option value="Security">Security</option>
              <option value="Autonomous">Autonomous</option>
              <option value="Research">Research</option>
              <option value="Crisis">Crisis</option>
              <option value="Contingency">Contingency</option>
            </select>
            <input
              title="Search protocols"
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
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm">{p.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-integra-text-secondary">{p.category}</span>
                    <span className={`text-xs px-1 rounded priority-${p.priority.toLowerCase()}`}>{p.priority}</span>
                  </div>
                </div>
                <span className={`status-badge ${p.cls}`}>{p.status}</span>
              </div>
              
              <p className="text-xs mt-2 text-integra-text-secondary">
                {p.description}
              </p>
              
              {/* Enhanced Protocol Metrics */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <div className="text-xs text-integra-text-secondary">Load</div>
                  <div className="flex items-center gap-1">
                    <Bar value={p.load} />
                    <span className="text-xs">{p.load}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-integra-text-secondary">Comms</div>
                  <div className="text-xs font-bold">{p.communications}/min</div>
                </div>
              </div>
              
              {/* Protocol Dependencies */}
              {p.dependencies.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs text-integra-text-secondary mb-1">Dependencies:</div>
                  <div className="flex flex-wrap gap-1">
                    {p.dependencies.map((dep, idx) => (
                      <span key={idx} className="text-xs bg-integra-border-color px-2 py-1 rounded">
                        {dep.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-xs text-integra-text-secondary">
            Showing {filtered.length}/{allProtocols.length} protocols
          </div>
          <div className="text-xs text-integra-text-secondary">
            Total System Load: {Math.round(filtered.reduce((sum, p) => sum + p.load, 0) / filtered.length)}% avg
          </div>
        </div>
      </section>
    </div>
  )
}

export default FlameTab
