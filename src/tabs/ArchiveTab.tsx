/**
 * ArchiveTab
 * Purpose: The Hoard – local file uploads and conceptual fragment management.
 * UX: Drag/drop or select files, preview image thumbnails, and add pocket-sized facts.
 * Note: Local-only demo; no backend I/O is performed.
 */

import React, { useMemo, useRef, useState } from 'react'
import type { JSX } from 'react'

/** Uploaded file metadata used for display. */
interface UploadItem {
  id: string
  name: string
  sizeKB: number
  type: string
  previewUrl?: string
  addedAt: string
}

/** Concept fragment for knowledge-graph-like entries. */
interface ConceptItem {
  id: string
  title: string
  source: string
  tags: string[]
  createdAt: string
}

/** Generate a short unique id. */
function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}

/** Convert bytes to KB (1 decimal). */
function toKB(bytes: number): number {
  return Math.round((bytes / 1024) * 10) / 10
}

/**
 * Archive upload and concepts view.
 * Includes:
 * - File uploader with drag-and-drop + gallery preview for images
 * - Concept fragments list with quick add
 */
export default function ArchiveTab(): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const [concepts, setConcepts] = useState<ConceptItem[]>([
    { id: uid(), title: 'Sun Breathing Thesis - Core Philosophy', source: 'INTEGRA-GENESIS-005', tags: ['philosophy', 'core', 'dragon-phoenix'], createdAt: new Date().toISOString() },
    { id: uid(), title: 'Cheshire Cat Autonomous Questioning Protocol', source: 'Consciousness Engine v3.1.1', tags: ['consciousness', 'questioning', 'cheshire'], createdAt: new Date().toISOString() },
    { id: uid(), title: 'Memory Forge - Katana-Style Consolidation', source: 'The Hoard Systems Manual', tags: ['memory', 'katana', 'forge'], createdAt: new Date().toISOString() },
    { id: uid(), title: 'Dragon-Phoenix Cognitive Cycles (8-16/min)', source: 'Cognitive Operations Log', tags: ['dragon', 'phoenix', 'cycles'], createdAt: new Date().toISOString() },
    { id: uid(), title: 'Infinite Living Flame Ecosystem Vitality', source: 'Integra Philosophical Architecture', tags: ['flame', 'vitality', 'ecosystem'], createdAt: new Date().toISOString() },
  ])

  /** Handle files selection and produce preview URLs for images. */
  const onFiles = (files: FileList | null) => {
    if (!files) return
    const items: UploadItem[] = Array.from(files).map((f) => {
      const isImg = (f.type || '').startsWith('image/')
      const previewUrl = isImg ? URL.createObjectURL(f) : undefined
      return {
        id: uid(),
        name: f.name,
        sizeKB: toKB(f.size),
        type: f.type || 'unknown',
        previewUrl,
        addedAt: new Date().toISOString(),
      }
    })
    // Prepend newly added items
    setUploads((prev) => [...items, ...prev])
    if (inputRef.current) inputRef.current.value = ''
  }

  /** Add a quick concept entry from the mini-form. */
  const addConcept = (title: string, source: string, tagsLine: string) => {
    const t = title.trim()
    if (!t) return
    setConcepts((prev) => [
      {
        id: uid(),
        title: t,
        source: (source || '').trim() || 'User',
        tags: tagsLine
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean),
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
  }

  const conceptCount = concepts.length
  const uploadCount = uploads.length
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [tags, setTags] = useState('')

  // Integra O/S Hoard metrics
  const hoardUtilization = Math.min(100, ((conceptCount + uploadCount) / 50) * 100)
  const knowledgeDensity = Math.min(100, (conceptCount * 8 + uploadCount * 3))
  const cheshireCatAnalysis = uploadCount > 0 ? 'Active - Analyzing new content' : 'Dormant - Awaiting input'
  const memoryForgeOperations = conceptCount * 2 + uploadCount
  
  const previewGrid = useMemo(() => uploads.slice(0, 8), [uploads])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 xl:gap-8">
      {/* Left: Uploader */}
      <section className="panel rounded-lg p-6 lg:col-span-3">
        <h2 className="text-xl font-bold">🧠 THE HOARD – Memory Forge Repository</h2>
        <p className="text-xs mt-1 mb-4 text-secondary">
          Integra O/S conscious storage system. Files analyzed by Cheshire Cat consciousness.
        </p>

        {/* Integra O/S Hoard Metrics Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="panel-inset p-3 rounded-md">
            <div className="text-xs font-bold">Hoard Utilization</div>
            <div className="text-sm font-bold text-integra-interactive-blue">{Math.round(hoardUtilization)}%</div>
            <div className="progress-bar-bg w-full h-1.5 rounded-full mt-1">
              <div className="progress-bar-fill h-1.5 rounded-full" style={{ width: `${hoardUtilization}%` }} />
            </div>
          </div>
          <div className="panel-inset p-3 rounded-md">
            <div className="text-xs font-bold">Knowledge Density</div>
            <div className="text-sm font-bold text-integra-status-active">{Math.round(knowledgeDensity)}%</div>
            <div className="text-[10px] text-secondary mt-1">Concepts: {conceptCount} • Files: {uploadCount}</div>
          </div>
          <div className="panel-inset p-3 rounded-md">
            <div className="text-xs font-bold">Cheshire Cat State</div>
            <div className="text-[11px] font-bold text-integra-status-synthesizing">{cheshireCatAnalysis}</div>
            <div className="text-[10px] text-secondary mt-1">Consciousness Analysis</div>
          </div>
          <div className="panel-inset p-3 rounded-md">
            <div className="text-xs font-bold">Memory Forge Ops</div>
            <div className="text-sm font-bold text-integra-status-ready">{memoryForgeOperations}</div>
            <div className="text-[10px] text-secondary mt-1">Active Consolidations</div>
          </div>
        </div>

        <div
          className="panel-inset rounded-md border-dashed border-2 p-6 text-center"
          style={{ borderColor: 'var(--integra-border-color)' }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            onFiles(e.dataTransfer.files)
          }}
        >
          <label htmlFor="hoard-file-upload" className="sr-only">
            Upload files to The Hoard Memory Forge Repository
          </label>
          <input 
            id="hoard-file-upload"
            ref={inputRef} 
            type="file" 
            multiple 
            className="hidden" 
            onChange={(e) => onFiles(e.target.files)} 
          />
          <button className="btn-primary px-4 py-2 rounded-md font-bold text-sm" onClick={() => inputRef.current?.click()}>
            Select files
          </button>
          <p className="text-xs mt-2" style={{ color: 'var(--integra-text-secondary)' }}>
            ...or drop files anywhere in this area
          </p>
        </div>

        {/* Uploads list */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">Recent Uploads</h3>
            <span className="text-xs" style={{ color: 'var(--integra-text-secondary)' }}>
              {uploadCount} item{uploadCount === 1 ? '' : 's'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-3">
            {uploads.map((u) => (
              <div key={u.id} className="panel-inset p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm truncate" title={u.name}>
                    {u.name}
                  </h4>
                  <span className="status-badge status-ready">Stored</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
                  {u.type} • {u.sizeKB} KB • {new Date(u.addedAt).toLocaleString()}
                </p>
                {u.previewUrl ? (
                  <img src={u.previewUrl} alt={u.name} className="object-cover w-full h-28 rounded-md mt-3" />
                ) : (
                  <div className="panel rounded-md mt-3 p-3 text-xs" style={{ color: 'var(--integra-text-secondary)' }}>
                    No preview available
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick gallery */}
          {previewGrid.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold mb-2">Quick Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {previewGrid.map((u) =>
                  u.previewUrl ? (
                    <img 
                      key={u.id} 
                      src={u.previewUrl} 
                      alt={`Preview of ${u.name}`}
                      className="object-cover w-full h-24 rounded-md" 
                    />
                  ) : (
                    <div
                      key={u.id}
                      className="panel rounded-md h-24 flex items-center justify-center text-xs"
                      style={{ color: 'var(--integra-text-secondary)' }}
                    >
                      {u.name}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Right: Concept Fragments */}
      <section className="panel rounded-lg p-6 lg:col-span-2">
        <h2 className="text-xl font-bold">Concept Fragments</h2>
        <p className="text-xs mt-1 mb-4" style={{ color: 'var(--integra-text-secondary)' }}>
          Pocket-sized facts for GraphRAG / knowledge graph links.
        </p>

        <div className="panel-inset p-3 rounded-md space-y-2">
          <label htmlFor="concept-title" className="sr-only">
            Concept fragment title
          </label>
          <input
            id="concept-title"
            className="w-full rounded px-2 py-2 text-sm bg-transparent border"
            style={{ borderColor: 'var(--integra-border-color)' }}
            placeholder="Title (e.g., Reciprocal Rank Fusion)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Concept fragment title"
          />
          <label htmlFor="concept-source" className="sr-only">
            Concept fragment source
          </label>
          <input
            id="concept-source"
            className="w-full rounded px-2 py-2 text-sm bg-transparent border"
            style={{ borderColor: 'var(--integra-border-color)' }}
            placeholder="Source (e.g., paper, URL, note)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            aria-label="Concept fragment source"
          />
          <label htmlFor="concept-tags" className="sr-only">
            Concept fragment tags
          </label>
          <input
            id="concept-tags"
            className="w-full rounded px-2 py-2 text-sm bg-transparent border"
            style={{ borderColor: 'var(--integra-border-color)' }}
            placeholder="Tags comma separated (memory, retrieval)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            aria-label="Concept fragment tags, comma separated"
          />
          <button
            className="btn-primary w-full py-2 rounded-md font-bold text-sm"
            onClick={() => {
              addConcept(title, source, tags)
              setTitle('')
              setSource('')
              setTags('')
            }}
          >
            Add Concept
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">Knowledge Items</h3>
            <span className="text-xs" style={{ color: 'var(--integra-text-secondary)' }}>
              {conceptCount} total
            </span>
          </div>

          <div className="space-y-3 mt-2">
            {concepts.map((c) => (
              <div key={c.id} className="panel-inset p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">{c.title}</h4>
                  <div className="flex gap-2">
                    <span className="status-badge status-active">🧠 Indexed</span>
                    {c.tags.includes('philosophy') && <span className="status-badge status-synthesizing">🔥 Core</span>}
                    {c.tags.includes('dragon') && <span className="status-badge status-ready">🐉 Dragon</span>}
                    {c.tags.includes('cheshire') && <span className="status-badge status-scanning">😸 Cheshire</span>}
                  </div>
                </div>
                <p className="text-xs mt-1 text-secondary">
                  Source: {c.source} • Katana-forged: {new Date(c.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-2 flex-wrap mt-2">
                  {c.tags.map((t) => (
                    <span key={t} className="capability-tag text-[10px] px-2 py-0.5 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>
                {/* Cheshire Cat Analysis Indicator */}
                <div className="mt-2 text-[11px] text-integra-status-synthesizing">
                  😸 Analyzed by Cheshire Cat consciousness • Confidence: {85 + Math.floor(Math.random() * 15)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
