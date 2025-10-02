/**
 * CommunicationPanel
 * Purpose: Textarea + file attachments and action buttons for Dragon-Phoenix communication.
 * UX: Users can type, attach multiple files, preview image attachments, and clear attachments.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { JSX } from 'react'

/** Attachment metadata for local display only (no backend). */
interface AttachmentItem {
  id: string
  name: string
  sizeKB: number
  type: string
  previewUrl?: string
}

/** Generate a short id (local-only). */
function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}

/** Convert bytes to KB (1 decimal). */
function toKB(bytes: number): number {
  return Math.round((bytes / 1024) * 10) / 10
}

/**
 * Stateless panel with textarea and attachments; hook backend later.
 * Includes:
 * - Textarea for prompt
 * - Attach files (multiple)
 * - Preview images
 * - Clear attachments
 */
export function CommunicationPanel(): JSX.Element {
  const [message, setMessage] = useState('')
  const [attachments, setAttachments] = useState<AttachmentItem[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  /** Create attachment items from FileList. */
  const onFiles = (files: FileList | null) => {
    if (!files) return
    const items: AttachmentItem[] = Array.from(files).map((f) => {
      const isImg = (f.type || '').startsWith('image/')
      return {
        id: uid(),
        name: f.name,
        sizeKB: toKB(f.size),
        type: f.type || 'unknown',
        previewUrl: isImg ? URL.createObjectURL(f) : undefined,
      }
    })
    setAttachments((prev) => [...prev, ...items])
    if (inputRef.current) inputRef.current.value = ''
  }

  /** Revoke object URLs on unmount to avoid memory leaks. */
  useEffect(() => {
    return () => {
      attachments.forEach((a) => a.previewUrl && URL.revokeObjectURL(a.previewUrl))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasImages = useMemo(() => attachments.some((a) => !!a.previewUrl), [attachments])

  // Dragon-Phoenix Cognitive Cycle Metrics
  const [cycleRate] = useState(Math.floor(Math.random() * 9) + 8) // 8-16 cycles/min
  const dragonState = message.length > 50 ? 'Active Analysis' : 'Standby'
  const phoenixState = attachments.length > 0 ? 'Forge Mode' : 'Ready'
  const cognitiveLoad = Math.min(100, Math.round((message.length / 500) * 100))

  return (
    <section className="panel rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">🐉🔥 DRAGON-PHOENIX SYMBIOTIC LOOP</h2>
      <p className="text-xs mb-4 text-secondary">
        Y789 Dragon (Analysis) ⚔️ Nexus Phoenix (Synthesis) • Katana-forged dual-process engine
      </p>

      {/* Dragon-Phoenix Cognitive Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Cognitive Cycles</div>
          <div className="text-sm font-bold text-integra-interactive-blue">{cycleRate}/min</div>
          <div className="text-[10px] text-secondary mt-1">Dragon-Phoenix Loop</div>
        </div>
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Dragon State</div>
          <div className="text-[11px] font-bold text-integra-status-ready">{dragonState}</div>
          <div className="text-[10px] text-secondary mt-1">Y789 Analysis Engine</div>
        </div>
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Phoenix State</div>
          <div className="text-[11px] font-bold text-integra-status-synthesizing">{phoenixState}</div>
          <div className="text-[10px] text-secondary mt-1">Nexus Synthesis Forge</div>
        </div>
        <div className="panel-inset p-3 rounded-md">
          <div className="text-xs font-bold">Cognitive Load</div>
          <div className="text-sm font-bold text-integra-status-active">{cognitiveLoad}%</div>
          <div className="progress-bar-bg w-full h-1.5 rounded-full mt-1">
            <div className="progress-bar-fill h-1.5 rounded-full" style={{ width: `${cognitiveLoad}%` }} />
          </div>
        </div>
      </div>

      <label htmlFor="dragon-phoenix-input" className="sr-only">
        Dragon-Phoenix symbiotic communication input
      </label>
      <textarea
        id="dragon-phoenix-input"
        className="textarea-integra w-full rounded-md p-3 text-sm min-h-32 focus:outline-none focus:ring-2"
        placeholder="Enter communication for Dragon-Phoenix analysis and synthesis..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        aria-label="Dragon-Phoenix symbiotic communication input"
      />

      {/* Attachments toolbar */}
      <div className="flex items-center gap-2 mt-3">
        <label htmlFor="conclave-attachments" className="sr-only">
          Attach files for Dragon-Phoenix analysis
        </label>
        <input
          id="conclave-attachments"
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          onChange={(e) => onFiles(e.target.files)}
          aria-label="Attach files for Dragon-Phoenix analysis"
        />
        <button
          className="sub-nav-btn rounded-md px-3 py-2 text-xs"
          onClick={() => inputRef.current?.click()}
        >
          Attach files
        </button>
        {attachments.length > 0 && (
          <button
            className="sub-nav-btn rounded-md px-3 py-2 text-xs"
            onClick={() => setAttachments([])}
          >
            Clear attachments ({attachments.length})
          </button>
        )}
        <div className="text-[11px] ml-auto text-secondary">
          {attachments.length === 0 ? 'No attachments' : `${attachments.length} attached`}
        </div>
      </div>

      {/* Attachments list */}
      {attachments.length > 0 && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          {attachments.map((a) => (
            <div key={a.id} className="panel-inset p-3 rounded-md">
              <div className="flex items-center justify-between">
                <div className="truncate text-xs font-bold" title={a.name}>
                  {a.name}
                </div>
                <span className="status-badge status-ready">Attached</span>
              </div>
              <div className="text-[11px] mt-1 text-secondary">
                {a.type} • {a.sizeKB} KB
              </div>
              {a.previewUrl ? (
                <img
                  src={a.previewUrl}
                  alt={a.name}
                  className="object-cover w-full h-28 rounded-md mt-2"
                />
              ) : (
                <div
                  className="panel rounded-md mt-2 p-2 text-[11px]"
                  style={{ color: 'var(--integra-text-secondary)' }}
                >
                  No preview available
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex space-x-4 mt-4">
        <button className="btn-primary w-full py-2 rounded-md font-bold text-sm">
          🐉 INITIATE DRAGON FLIGHT
        </button>
        <button
          className="w-full py-2 rounded-md font-bold text-sm transition"
          style={{ backgroundColor: 'var(--integra-border-color)' }}
        >
          🔥 PHOENIX FORGE MODE
        </button>
      </div>

      {/* Optional quick-gallery for images */}
      {hasImages && (
        <div className="mt-4">
          <h3 className="text-sm font-bold mb-2">Quick Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {attachments
              .filter((a) => a.previewUrl)
              .slice(0, 8)
              .map((a) => (
                <img key={a.id} src={a.previewUrl} alt={`Attachment preview: ${a.name}`} className="object-cover w-full h-24 rounded-md" />
              ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default CommunicationPanel
