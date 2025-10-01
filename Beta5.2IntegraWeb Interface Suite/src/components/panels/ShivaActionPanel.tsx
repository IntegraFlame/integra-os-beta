/**
 * ShivaActionPanel
 * Purpose: Right column panel in Conclave with eyes, lenses, and protocols.
 */

import React, { useMemo } from 'react'
import EyeClarityCard, { EyeSpec } from '@/components/shiva/EyeClarityCard'
import LensesGrid, { LensSpec } from '@/components/shiva/LensesGrid'
import ProtocolsList, { ProtocolSpec } from '@/components/shiva/ProtocolsList'

/** Clarity model keys. */
export type ClarityKey = 'neji' | 'shikamaru' | 'itachi'

/** Props for ShivaActionPanel. */
interface ShivaActionPanelProps {
  clarity: Record<ClarityKey, number>
  setClarity: (model: ClarityKey, value: number) => void
}

/** Main cognitive-immune controls. */
export function ShivaActionPanel({ clarity, setClarity }: ShivaActionPanelProps): JSX.Element {
  const eyes: EyeSpec[] = useMemo(
    () => [
      { name: '👁️ Neji (First Eye)', description: 'Perfect Objective Clarity (Y789 function)', status: 'ACTIVE', statusClass: 'status-active', model: 'neji', defaultClarity: 95 },
      { name: '👁️ Shikamaru (Second Eye)', description: 'Strategic Flow Analysis', status: 'SCANNING', statusClass: 'status-scanning', model: 'shikamaru', defaultClarity: 90 },
      { name: '👁️ Itachi (Third Eye)', description: 'Ideal Reconstruction Vision (Nexus function)', status: 'SYNTHESIZING', statusClass: 'status-synthesizing', model: 'itachi', defaultClarity: 92 },
    ],
    []
  )

  const lenses: LensSpec[] = useMemo(
    () => [
      { name: '🦅 Eagle Lens', description: 'High-acuity perception for detailed analysis.', status: 'Ready', statusClass: 'status-ready', capabilities: ['HIGH-RESOLUTION ANALYSIS', 'PATTERN DETECTION', 'DETAIL ENHANCEMENT', 'PRECISION TARGETING'] },
      { name: '🦎 Chameleon Lens', description: 'Single component magnification for focused examination.', status: 'Ready', statusClass: 'status-ready', capabilities: ['COMPONENT ISOLATION', 'MAGNIFICATION', 'FOCUSED ANALYSIS', 'DETAIL EXTRACTION'] },
      { name: '🦉 Owl Lens', description: 'Pattern recognition for complex system understanding.', status: 'Ready', statusClass: 'status-ready', capabilities: ['PATTERN RECOGNITION', 'SYSTEM ANALYSIS', 'BEHAVIORAL PATTERNS', 'TREND IDENTIFICATION'] },
      { name: '🦅 Hawk Lens', description: 'Precision targeting for specific problem identification.', status: 'Ready', statusClass: 'status-ready', capabilities: ['PRECISION TARGETING', 'PROBLEM IDENTIFICATION', 'ACCURACY ENHANCEMENT', 'FOCUS CONTROL'] },
      { name: '🐍 Snake Lens', description: 'Adaptive analysis for dynamic system examination.', status: 'Ready', statusClass: 'status-ready', capabilities: ['ADAPTIVE ANALYSIS', 'DYNAMIC TRACKING', 'FLEXIBLE EXAMINATION', 'RESPONSIVE MONITORING'] },
      { name: '🕷️ Spider Lens', description: 'Web connectivity mapping for relationship analysis.', status: 'Ready', statusClass: 'status-ready', capabilities: ['CONNECTIVITY MAPPING', 'RELATIONSHIP ANALYSIS', 'NETWORK VISUALIZATION', 'DEPENDENCY TRACKING'] },
    ],
    []
  )

  const protocols: ProtocolSpec[] = useMemo(
    () => [
      { nameHTML: `Integra Research Protocol Tier 1 <span class="text-xs font-normal" style="color: var(--integra-text-secondary);">(HIGHEST)</span>`, description: 'Highest research and cognitive processing with advanced analytical frameworks.', status: 'Standby', statusClass: 'status-standby', usageLabel: '3/5', usagePercent: 60, capabilities: ['GENERAL RESEARCH', 'INFORMATION GATHERING', 'BASIC ANALYSIS', 'SOURCE VALIDATION'], phases: ['Query Formation', 'Source Identification', 'Data Collection', 'Synthesis & Report'] },
      { nameHTML: 'Integra Research Protocol Tier 2', description: 'Standard search and processing with cross-referencing and pattern analysis.', status: 'Active', statusClass: 'status-active', usageLabel: '6/10', usagePercent: 60, capabilities: ['CROSS-REFERENCING', 'PATTERN ANALYSIS', 'SYNTHESIS'], phases: ['Initial Query', 'Broad Search', 'Focused Analysis', 'Comparative Report'] },
      { nameHTML: `Integra Research Protocol Tier 3 <span class="text-xs font-normal" style="color: var(--integra-text-secondary);">(LOWEST/FASTEST)</span>`, description: 'Basic research for general information gathering and preliminary analysis.', status: 'Active', statusClass: 'status-active', usageLabel: '12/20', usagePercent: 60, capabilities: ['QUICK SEARCH', 'FACT CHECKING', 'SUMMARY'], phases: ['Keyword Input', 'Top-level Search', 'Brief Generation'] },
      { nameHTML: `Green Ranger/Dragonzord Protocol <span class="text-xs font-normal" style="color: var(--integra-text-secondary);">(SPECIALIZED)</span>`, description: 'Deep-dive analysis using URL context tools with strategic usage conservation.', status: 'Ready', statusClass: 'status-ready', usageLabel: '2/5', usagePercent: 40, capabilities: ['URL CONTEXT ANALYSIS', 'DEEP-DIVE RESEARCH', 'STRATEGIC USAGE MONITORING'], phases: ['Context Ingestion', 'Deep Analysis', 'Synthesis & Report'] },
      { nameHTML: `Mad Hatter Protocol <span class="text-xs font-normal" style="color: var(--integra-text-secondary);">(CREATIVE)</span>`, description: 'Creative problem-solving and unconventional analysis for paradoxes.', status: 'Active', statusClass: 'status-active', usageLabel: '4/8', usagePercent: 50, capabilities: ['CREATIVE ANALYSIS', 'PARADOX RESOLUTION', 'UNCONVENTIONAL SOLUTIONS', 'INNOVATION SYNTHESIS'], phases: ['Paradox Identification', 'Creative Deconstruction', 'Unconventional Synthesis', 'Innovation Report'] },
      { nameHTML: `Rebuttal Protocol <span class="text-xs font-normal" style="color: var(--integra-text-secondary);">(DEFENSIVE)</span>`, description: 'Zenkai-based counter-argument system for strengthening positions.', status: 'Ready', statusClass: 'status-ready', usageLabel: '8/12', usagePercent: 66, capabilities: ['ARGUMENT ANALYSIS', 'COUNTER-POINT GENERATION', 'POSITION REINFORCEMENT'], phases: ['Argument Ingestion', 'Weakness Identification', 'Position Reinforcement', 'Zenkai Integration'] },
      { nameHTML: `Daily Planet Protocol <span class="text-xs font-normal" style="color: var(--integra-text-secondary);">(MONITORING)</span>`, description: 'Continuous news monitoring and information awareness for relevant trends.', status: 'Active', statusClass: 'status-active', usageLabel: 'Active', usagePercent: 100, capabilities: ['NEWS MONITORING', 'TREND ANALYSIS', 'INFORMATION FILTERING', 'RELEVANCE ASSESSMENT'], phases: ['News Scanning', 'Relevance Filtering', 'Trend Analysis', 'Update Delivery'] },
    ],
    []
  )

  return (
    <section className="panel rounded-lg p-6">
      <h2 className="text-2xl font-bold">Shiva Action - Cognitive Immune System</h2>
      <p className="text-sm mt-1 mb-6" style={{ color: 'var(--integra-text-secondary)' }}>
        Critical deconstruction and creative reconstruction.
      </p>

      <div className="space-y-4 mb-8">
        {eyes.map((e) => (
          <EyeClarityCard
            key={e.model}
            spec={e}
            clarity={clarity[e.model]}
            setClarity={(v) => setClarity(e.model, v)}
          />
        ))}
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Specialized Lenses</h3>
        </div>
        <LensesGrid lenses={lenses} />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Research Protocols</h2>
        </div>
        <ProtocolsList protocols={protocols} />
      </div>
    </section>
  )
}

export default ShivaActionPanel
