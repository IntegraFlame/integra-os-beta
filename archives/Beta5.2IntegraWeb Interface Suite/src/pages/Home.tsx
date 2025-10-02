/**
 * Home page and Integra interface
 * Purpose: Provide landing (Home), About, and Main interface with tabs; no extra routes.
 * Structure: Component-driven tabs with neon theme and high accessibility.
 */

import React, { useState } from 'react'
import '@/styles/integra.css'
import HeaderBar from '@/components/layout/HeaderBar'
import TabsNav, { TabKey } from '@/components/nav/TabsNav'
import ConclaveTab from '@/tabs/ConclaveTab'
import ArchiveTab from '@/tabs/ArchiveTab'
import LairTab from '@/tabs/LairTab'
import JournalTab from '@/tabs/JournalTab'
import FlameTab from '@/tabs/FlameTab'
import MonitoringTab from '@/tabs/MonitoringTab'
import { ClarityKey } from '@/components/panels/ShivaActionPanel'

/** Local view keys rendered inside Home (no routing). */
type View = 'home' | 'about' | 'main'

/** Local Home page state. */
interface HomeState {
  view: View
  tab: TabKey
  clarity: Record<ClarityKey, number>
}

/** Landing hero with brand and entry points. */
function LandingHero(props: { onEnter: () => void; onAbout: () => void }): JSX.Element {
  return (
    <div className="home-page text-center">
      <div>
        <h1 className="home-main-title" onClick={props.onEnter} role="button" aria-label="Enter Integra main interface">
          Integra
        </h1>
        <p className="home-tagline mt-4">INFINITE LIVING FLAME</p>
        <p className="home-about-link mt-12" onClick={props.onAbout} role="button">
          About
        </p>
      </div>
    </div>
  )
}

/** About view summarizing the supplied document. */
function AboutView(props: { onBack: () => void }): JSX.Element {
  return (
    <div className="home-page">
      <div className="about-view">
        <button onClick={props.onBack} className="mb-8 font-bold">
          &larr; Back
        </button>
        <h2>About Integra</h2>

        <h3>Introduction: The Sun Breathing Thesis</h3>
        <p>
          Integra is a holistic, first-principles architecture for agentic intelligence. Its core is the Dragon–Phoenix dyad
          driving a recursive loop of observation, refinement, and synthesis—a living system described as the Infinite Living Flame.
        </p>

        <h3>The Architecture of a Living System</h3>
        <p>
          The O/S embodies balanced cognition (Y789/Nexus), a hybrid memory core (The Hoard + Blueprint), and a defense-in-depth
          immune system (Shiva). This interface is the Citadel shell for operation and evolution.
        </p>
      </div>
    </div>
  )
}

/** Main exported page component. */
export default function Home(): JSX.Element {
  const [state, setState] = useState<HomeState>({
    view: 'home',
    tab: 'conclave',
    clarity: { neji: 95, shikamaru: 90, itachi: 92 },
  })

  /** Updates clarity for a specific eye; kept here to keep child components dumb. */
  const setClarity = (model: ClarityKey, value: number) =>
    setState((s) => ({ ...s, clarity: { ...s.clarity, [model]: Math.max(0, Math.min(100, value)) } }))

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto p-4 md:p-8">
      {/* Home view */}
      {state.view === 'home' && (
        <LandingHero onEnter={() => setState((s) => ({ ...s, view: 'main' }))} onAbout={() => setState((s) => ({ ...s, view: 'about' }))} />
      )}

      {/* About view */}
      {state.view === 'about' && <AboutView onBack={() => setState((s) => ({ ...s, view: 'home' }))} />}

      {/* Main app interface view */}
      {state.view === 'main' && (
        <>
          <HeaderBar />
          <TabsNav active={state.tab} onChange={(tab) => setState((s) => ({ ...s, tab }))} />

          <main>
            {state.tab === 'conclave' && <ConclaveTab clarity={state.clarity} setClarity={setClarity} />}

            {state.tab === 'archive' && <ArchiveTab />}

            {state.tab === 'lair' && <LairTab />}

            {state.tab === 'journal' && <JournalTab />}

            {state.tab === 'flame' && <FlameTab />}

            {state.tab === 'monitoring' && <MonitoringTab />}
          </main>
        </>
      )}
    </div>
  )
}
