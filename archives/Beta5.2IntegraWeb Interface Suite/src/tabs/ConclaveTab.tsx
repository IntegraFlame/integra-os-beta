/**
 * ConclaveTab
 * Purpose: Main collaboration surface; left communication/log, right Shiva panel.
 */

import React from 'react'
import ShivaActionPanel, { ClarityKey } from '@/components/panels/ShivaActionPanel'
import CommunicationPanel from '@/components/conclave/CommunicationPanel'
import ProcessingLog from '@/components/conclave/ProcessingLog'

/** Props for ConclaveTab. */
interface ConclaveTabProps {
  clarity: Record<ClarityKey, number>
  setClarity: (model: ClarityKey, value: number) => void
}

/** Two-column layout combining communication and Shiva. */
export function ConclaveTab({ clarity, setClarity }: ConclaveTabProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <CommunicationPanel />
        <ProcessingLog />
      </div>
      <div className="space-y-8">
        <ShivaActionPanel clarity={clarity} setClarity={setClarity} />
      </div>
    </div>
  )
}

export default ConclaveTab
