/**
 * LairTab
 * Purpose: User/AI Workspace with multi-channel conversation hub.
 * Channels: Heimdall, Cheshire Cat, Phoenix Engine, Dragon Engine.
 */

import React, { useMemo, useState } from 'react'

type ChannelKey = 'heimdall' | 'cheshire' | 'phoenix' | 'dragon'

interface Msg {
  id: string
  role: 'system' | 'ai' | 'user'
  text: string
  ts: string
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}

/** Seed conversations matching the screenshots. */
function useSeed(): Record<ChannelKey, Msg[]> {
  return useMemo(
    () => ({
      heimdall: [
        { id: uid(), role: 'ai', text: 'System monitoring active. All protocols operational.', ts: new Date().toISOString() },
        { id: uid(), role: 'user', text: 'Status report on KRI metrics?', ts: new Date().toISOString() },
        { id: uid(), role: 'ai', text: 'KRI metrics within normal parameters. Efficiency at 94%.', ts: new Date().toISOString() },
      ],
      cheshire: [{ id: uid(), role: 'ai', text: 'Purring curiosity suggests exploring three paradoxes today.', ts: new Date().toISOString() }],
      phoenix: [{ id: uid(), role: 'ai', text: 'Blueprint diff complete. 3 improvements queued for Land cycle.', ts: new Date().toISOString() }],
      dragon: [{ id: uid(), role: 'ai', text: 'Recon flight completed. 34 sources parsed. 11 strong leads.', ts: new Date().toISOString() }],
    }),
    []
  )
}

const channelMeta: Record<ChannelKey, { label: string; icon: string }> = {
  heimdall: { label: 'Heimdall Protocol', icon: '🛡️' },
  cheshire: { label: 'Cheshire Cat', icon: '🐈‍⬛' },
  phoenix: { label: 'Phoenix Engine', icon: '🦅' },
  dragon: { label: 'Dragon Engine', icon: '🐉' },
}

/** Conversation hub with per-channel threads and composer. */
export function LairTab(): JSX.Element {
  const seeds = useSeed()
  const [active, setActive] = useState<ChannelKey>('heimdall')
  const [threads, setThreads] = useState<Record<ChannelKey, Msg[]>>(seeds)
  const [input, setInput] = useState('')

  const send = () => {
    const text = input.trim()
    if (!text) return
    const now = new Date().toISOString()
    setThreads((t) => ({
      ...t,
      [active]: [...t[active], { id: uid(), role: 'user', text, ts: now }],
    }))
    setInput('')
    // Demo auto-reply
    setTimeout(() => {
      const reply =
        active === 'heimdall'
          ? 'Acknowledged. Updating KRI snapshot... green across KPIs.'
          : active === 'dragon'
          ? 'Flight path extended. Next target: Hybrid Search evaluation.'
          : active === 'phoenix'
          ? 'Applying differential hardening to Blueprint components.'
          : 'Mischief noted. A riddle: What breaks but never falls?'
      setThreads((t) => ({
        ...t,
        [active]: [...t[active], { id: uid(), role: 'ai', text: reply, ts: new Date().toISOString() }],
      }))
    }, 500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Channels list */}
      <section className="panel rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Channels</h2>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(channelMeta) as ChannelKey[]).map((k) => (
            <button
              key={k}
              className={`sub-nav-btn py-2 px-3 rounded-md text-xs font-bold ${active === k ? 'active' : ''}`}
              onClick={() => setActive(k)}
            >
              {channelMeta[k].icon} {channelMeta[k].label}
            </button>
          ))}
        </div>

        <div className="mt-6 text-xs" style={{ color: 'var(--integra-text-secondary)' }}>
          <p>System Status: Online</p>
          <p>Protocols: Coordinated</p>
        </div>
      </section>

      {/* Thread */}
      <section className="panel rounded-lg p-6 lg:col-span-2">
        <h2 className="text-xl font-bold">AI Communication Hub</h2>
        <p className="text-xs mt-1 mb-4" style={{ color: 'var(--integra-text-secondary)' }}>
          {channelMeta[active].label}
        </p>

        <div className="panel-inset rounded-md p-4 h-[380px] overflow-y-auto space-y-3">
          {threads[active].map((m) => (
            <div key={m.id} className={`text-sm ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block px-3 py-2 rounded-md ${
                  m.role === 'user' ? 'btn-primary' : 'panel'
                }`}
              >
                {m.text}
              </span>
              <div className="text-[10px] mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
                {new Date(m.ts).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            className="flex-1 rounded px-3 py-2 text-sm bg-transparent border"
            style={{ borderColor: 'var(--integra-border-color)' }}
            placeholder={`Communicate with ${channelMeta[active].label}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button className="btn-primary px-4 py-2 rounded-md font-bold text-sm" onClick={send}>
            Send
          </button>
        </div>
      </section>
    </div>
  )
}

export default LairTab
