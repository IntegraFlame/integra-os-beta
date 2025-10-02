/**
 * JournalTab
 * Purpose: Read-only diagnostics and autonomous updates feed.
 */

import React, { useState } from 'react'

type FeedKey = 'all' | 'flights' | 'cheshire' | 'memory' | 'background'

interface Entry {
  id: string
  kind: FeedKey
  title: string
  details: string
  meta: Record<string, string>
  ts: string
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}

/** Pre-seeded entries inspired by screenshots. */
const seed: Entry[] = [
  {
    id: uid(),
    kind: 'flights',
    title: 'Independent Flight – Market Analysis',
    details: 'Autonomous research flight completed on cryptocurrency market trends.',
    meta: { Duration: '23 minutes', 'Data Points': '1,247', 'Insights Generated': '241' },
    ts: new Date().toISOString(),
  },
  {
    id: uid(),
    kind: 'background',
    title: 'Scout Drone – Information Gathering',
    details: 'Tsukuyomi Protocol scout completed intelligence gathering on emerging AI frameworks.',
    meta: { 'Sources Analyzed': '34', 'Relevance Score': '8.7/10', 'Action Items': '7' },
    ts: new Date().toISOString(),
  },
  {
    id: uid(),
    kind: 'cheshire',
    title: 'Cheshire Update – Paradox Queue',
    details: 'Queued 3 paradoxes for Looking-Glass review.',
    meta: { Priority: 'Medium' },
    ts: new Date().toISOString(),
  },
  {
    id: uid(),
    kind: 'memory',
    title: 'Memory Consolidation',
    details: 'Backed up working memory to The Hoard and cleared transient buffers.',
    meta: { Items: '56', Status: 'OK' },
    ts: new Date().toISOString(),
  },
]

/** Pill-like filter button. */
function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button className={`sub-nav-btn rounded-md px-3 py-2 text-xs font-bold ${active ? 'active' : ''}`} onClick={onClick}>
      {children}
    </button>
  )
}

/** Journal feed panel. */
export function JournalTab(): JSX.Element {
  const [filter, setFilter] = useState<FeedKey>('all')
  const items = seed.filter((e) => filter === 'all' || e.kind === filter)

  return (
    <section className="panel rounded-lg p-6">
      <h2 className="text-xl font-bold">Updates Stream</h2>

      <div className="flex flex-wrap gap-2 mt-4">
        <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>ALL UPDATES</FilterBtn>
        <FilterBtn active={filter === 'flights'} onClick={() => setFilter('flights')}>INDEPENDENT FLIGHTS</FilterBtn>
        <FilterBtn active={filter === 'cheshire'} onClick={() => setFilter('cheshire')}>CHESHIRE CAT</FilterBtn>
        <FilterBtn active={filter === 'memory'} onClick={() => setFilter('memory')}>MEMORY CONSOLIDATION</FilterBtn>
        <FilterBtn active={filter === 'background'} onClick={() => setFilter('background')}>BACKGROUND ACTIONS</FilterBtn>
      </div>

      <div className="space-y-4 mt-6">
        {items.map((e) => (
          <div key={e.id} className="panel-inset p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">{e.title}</h3>
              <span className="text-[10px]" style={{ color: 'var(--integra-text-secondary)' }}>
                {new Date(e.ts).toLocaleString()}
              </span>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--integra-text-secondary)' }}>
              {e.details}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 text-xs">
              {Object.entries(e.meta).map(([k, v]) => (
                <div key={k} className="panel rounded-md p-2">
                  <div className="font-bold">{k}</div>
                  <div style={{ color: 'var(--integra-text-secondary)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Notes composer (read-only feel; adds below) */}
      <div className="mt-8">
        <h3 className="text-sm font-bold mb-2">User Notes &amp; Integra Actions</h3>
        <div className="panel-inset p-3 rounded-md grid grid-cols-1 gap-2">
          <input
            placeholder="Add a note or observation..."
            className="w-full rounded px-3 py-2 text-sm bg-transparent border"
            style={{ borderColor: 'var(--integra-border-color)' }}
          />
          <button className="btn-primary w-32 py-2 rounded-md font-bold text-sm">ADD NOTE</button>
        </div>
      </div>
    </section>
  )
}

export default JournalTab
