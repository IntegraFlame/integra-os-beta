/** 
 * App root
 * Purpose: Provides router shell for the application. We keep a single Home route
 * and handle internal views (Home/About/Main) within Home to match existing UX.
 */

import React from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  )
}
