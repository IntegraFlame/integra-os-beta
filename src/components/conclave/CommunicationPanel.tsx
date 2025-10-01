/**
 * CommunicationPanel
 * Purpose: Textarea + file attachments and action buttons for Dragon-Phoenix communication.
 * UX: Users can type, attach multiple files, preview image attachments, and clear attachments.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'

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

  return (
    <section className="panel rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">Dragon-Phoenix Symbiotic Communication</h2>
      <p className="text-xs mb-4" style={{ color: 'var(--integra-text-secondary)' }}>
        Y789/Nexus dual-process cognitive engine operational.
      </p>

      <textarea
        className="w-full rounded-md p-3 text-sm min-h-32 focus:outline-none focus:ring-2"
        placeholder="Enter communication..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          backgroundColor: 'var(--integra-bg-dark)',
          border: '1px solid var(--integra-border-color)',
          // @ts-expect-error custom token
          '--tw-ring-color': 'var(--integra-interactive-blue)',
        } as React.CSSProperties}
      />

      {/* Attachments toolbar */}
      <div className="flex items-center gap-2 mt-3">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          onChange={(e) => onFiles(e.target.files)}
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
        <div className="text-[11px] ml-auto" style={{ color: 'var(--integra-text-secondary)' }}>
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
              <div className="text-[11px] mt-1" style={{ color: 'var(--integra-text-secondary)' }}>
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
        <button className="btn-primary w-full py-2 rounded-md font-bold text-sm">INITIATE FLIGHT</button>
        <button
          className="w-full py-2 rounded-md font-bold text-sm transition"
          style={{ backgroundColor: 'var(--integra-border-color)' }}
        >
          CONFIGURE
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
                <img key={a.id} src={a.previewUrl} className="object-cover w-full h-24 rounded-md" />
              ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default CommunicationPanel
