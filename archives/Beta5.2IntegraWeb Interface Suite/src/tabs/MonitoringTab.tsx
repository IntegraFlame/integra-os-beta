/**
 * MonitoringTab
 * Purpose: Real-time metrics dashboard and status tiles (Heimdall KRI-style) + clocks, protocol comms,
 * compact GPU throttling, Looking-Glass status, and sleep cycles (Consolidation / Slow-wave / Deep sleep).
 */

import React, { useEffect, useMemo, useState } from 'react'

/** Labeled bar row. */
function BarRow({ label, value, suffix = '%'}: { label: string; value: number; suffix?: string }) {
  return (
    <div className="grid grid-cols-5 gap-3 items-center">
      <div className="text-xs col-span-2">{label}</div>
      <div className="col-span-2">
        <div className="progress-bar-bg w-full h-1.5 rounded-full">
          <div className="progress-bar-fill h-1.5 rounded-full" style={{ width: `${value}%` }} />
        </div>
      </div>
      <div className="text-xs text-right">{`${value}${suffix}`}</div>
    </div>
  )
}

/** Compact linear bar. */
function Line({ value }: { value: number }) {
  return (
    <div className="progress-bar-bg w-full h-1 rounded-full">
      <div className="progress-bar-fill h-1 rounded-full" style={{ width: `${value}%` }} />
    </div>
  )
}

/** Sleep cycle structure */
interface SleepCycle {
  name: 'Consolidation' | 'Slow-wave' | 'Deep Sleep'
  status: 'Idle' | 'Running' | 'Scheduled'
  progress: number
  desc: string
}

export function MonitoringTab(): JSX.Element {
  // Base metrics (Heimdall KRI concept)
  const [cognitiveLoad, setCognitiveLoad] = useState(61)
  const [processingEfficiency] = useState(89)
  const [responseTime] = useState(234)
  const [protocolCoordination] = useState(94)
  const [wisdomRate] = useState(76)

  // Clocks
  const [utc, setUtc] = useState<string>(new Date().toUTCString())
  const [local, setLocal] = useState<string>(new Date().toLocaleString())
  const [lamport, setLamport] = useState<number>(1003)
  const [vectorA, setVectorA] = useState<number>(42)
  const [vectorB, setVectorB] = useState<number>(37)

  // Compact GPU throttling
  const [gpuY, setGpuY] = useState(72)
  const [gpuP, setGpuP] = useState(68)

  // Cheshire/Heimdall comms
  const [comms, setComms] = useState<Array<{ from: 'Heimdall' | 'Cheshire'; text: string; t: string }>>([
    { from: 'Heimdall', text: 'CLI steady at 61%; amber threshold enforced', t: new Date().toLocaleTimeString() },
    { from: 'Cheshire', text: 'Noted. Opportunistic scan scheduled.', t: new Date().toLocaleTimeString() },
  ])

  // Sleep cycles
  const [cycles, setCycles] = useState<SleepCycle[]>([
    { name: 'Consolidation', status: 'Idle', progress: 0, desc: 'Daily light defrag; working memory backup.' },
    { name: 'Slow-wave', status: 'Scheduled', progress: 0, desc: 'Periodic deeper integration & cleanup.' },
    { name: 'Deep Sleep', status: 'Scheduled', progress: 0, desc: 'Architectural metamorphosis & rebuild.' },
  ])

  // Timers
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()
      setUtc(now.toUTCString())
      setLocal(now.toLocaleString())
      // Simulate logical clocks
      setLamport((v) => v + 1)
      setVectorA((v) => v + (Math.random() > 0.5 ? 1 : 0))
      setVectorB((v) => v + (Math.random() > 0.5 ? 1 : 0))
      // Simulate cognitive load small fluctuation
      setCognitiveLoad((v) => Math.max(50, Math.min(95, v + (Math.random() > 0.5 ? 1 : -1))))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // Derived Heimdall status
  const heimdallState = useMemo<'Green' | 'Amber' | 'Red'>(() => {
    if (cognitiveLoad > 85) return 'Red'
    if (cognitiveLoad >= 61) return 'Amber'
    return 'Green'
  }, [cognitiveLoad])

  return (
    <section className="panel rounded-lg p-6">
      <h2 className="text-xl font-bold">System Monitoring</h2>

      {/* Top status tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Heimdall KRI</div>
          <div className="text-xs mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
            CLI: {cognitiveLoad}% • <span className={`status-badge ${heimdallState === 'Green' ? 'status-active' : heimdallState === 'Amber' ? 'status-ready' : 'status-synthesizing'}`}>{heimdallState}</span>
          </div>
        </div>
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Clocks</div>
          <div className="text-[11px] mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
            UTC: {utc}
          </div>
          <div className="text-[11px]" style={{ color: 'var(--integra-text-secondary)' }}>
            Local: {local}
          </div>
        </div>
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Logical Clocks</div>
          <div className="text-[11px] mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
            Lamport: {lamport}
          </div>
          <div className="text-[11px]" style={{ color: 'var(--integra-text-secondary)' }}>
            Vector: [{vectorA}, {vectorB}]
          </div>
        </div>
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Looking-Glass Protocol</div>
          <span className="status-badge status-ready mt-2 inline-block">READY</span>
        </div>
      </div>

      {/* Metric bars */}
      <div className="mt-6 space-y-3">
        <BarRow label="Cognitive Load" value={cognitiveLoad} />
        <BarRow label="Processing Efficiency" value={processingEfficiency} />
        <BarRow label="Response Time" value={responseTime} suffix="ms" />
        <BarRow label="Protocol Coordination" value={protocolCoordination} />
        <BarRow label="Wisdom Accumulation Rate" value={wisdomRate} />
      </div>

      {/* GPU mini throttling + Sleep cycles + Comms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">GPU Throttling (Compact)</div>
          <div className="text-[11px] mt-2" style={{ color: 'var(--integra-text-secondary)' }}>
            Y789 Throttle
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button className="control-btn px-2 py-1 rounded text-xs" onClick={() => setGpuY((v) => Math.max(0, v - 5))}>
              -
            </button>
            <div className="flex-1">
              <Line value={gpuY} />
            </div>
            <button className="control-btn px-2 py-1 rounded text-xs" onClick={() => setGpuY((v) => Math.min(100, v + 5))}>
              +
            </button>
            <span className="text-xs">{gpuY}%</span>
          </div>

          <div className="text-[11px] mt-3" style={{ color: 'var(--integra-text-secondary)' }}>
            Phoenix Complexity
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button className="control-btn px-2 py-1 rounded text-xs" onClick={() => setGpuP((v) => Math.max(0, v - 5))}>
              -
            </button>
            <div className="flex-1">
              <Line value={gpuP} />
            </div>
            <button className="control-btn px-2 py-1 rounded text-xs" onClick={() => setGpuP((v) => Math.min(100, v + 5))}>
              +
            </button>
            <span className="text-xs">{gpuP}%</span>
          </div>
        </div>

        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Sleep Cycles</div>
          <div className="text-[11px]" style={{ color: 'var(--integra-text-secondary)' }}>
            Manage consolidation and deep processing windows.
          </div>
          <div className="space-y-2 mt-2">
            {cycles.map((c, idx) => (
              <div key={c.name} className="p-2 rounded-md" style={{ background: 'var(--integra-bg-dark)', border: '1px solid var(--integra-border-color)' }}>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold">{c.name}</div>
                  <span className={`status-badge ${c.status === 'Running' ? 'status-active' : c.status === 'Scheduled' ? 'status-ready' : 'status-standby'}`}>
                    {c.status}
                  </span>
                </div>
                <div className="text-[11px] mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
                  {c.desc}
                </div>
                <div className="mt-2">
                  <Line value={c.progress} />
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="sub-nav-btn rounded-md px-2 py-1 text-[11px]"
                    onClick={() =>
                      setCycles((arr) =>
                        arr.map((it, i) =>
                          i === idx ? { ...it, status: 'Running', progress: Math.min(100, it.progress + 20) } : it
                        )
                      )
                    }
                  >
                    Start now
                  </button>
                  <button
                    className="sub-nav-btn rounded-md px-2 py-1 text-[11px]"
                    onClick={() =>
                      setCycles((arr) =>
                        arr.map((it, i) => (i === idx ? { ...it, status: 'Scheduled', progress: 0 } : it))
                      )
                    }
                  >
                    Reset
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Cheshire ↔ Heimdall</div>
          <div className="text-[11px] mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
            Protocol communication stream
          </div>
          <div className="mt-2 space-y-2 max-h-40 overflow-auto pr-1">
            {comms.map((m, i) => (
              <div key={i} className="p-2 rounded-md" style={{ background: 'var(--integra-bg-dark)', border: '1px solid var(--integra-border-color)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{m.from}</span>
                  <span className="text-[10px]" style={{ color: 'var(--integra-text-secondary)' }}>
                    {m.t}
                  </span>
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="sub-nav-btn rounded-md px-2 py-1 text-[11px]"
              onClick={() =>
                setComms((arr) => [
                  ...arr,
                  { from: 'Heimdall', text: 'Amber guard engaged; throttling lows set', t: new Date().toLocaleTimeString() },
                ])
              }
            >
              Send Heimdall ping
            </button>
            <button
              className="sub-nav-btn rounded-md px-2 py-1 text-[11px]"
              onClick={() =>
                setComms((arr) => [
                  ...arr,
                  { from: 'Cheshire', text: 'Curiosity loop initiated at low intensity', t: new Date().toLocaleTimeString() },
                ])
              }
            >
              Send Cheshire ping
            </button>
          </div>
        </div>
      </div>

      {/* Footer GPU mini-panel and cost */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">GPU</div>
          <div className="text-xs mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
            NVIDIA T4: ACTIVE
          </div>
        </div>
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Upgrades</div>
          <div className="flex gap-2 mt-2">
            <button className="sub-nav-btn rounded-md px-2 py-1 text-[11px]">A100</button>
            <button className="sub-nav-btn rounded-md px-2 py-1 text-[11px]">H100</button>
          </div>
        </div>
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Cost Efficiency</div>
          <span className="status-badge status-active mt-2 inline-block">Optimal</span>
        </div>
      </div>
    </section>
  )
}

export default MonitoringTab
