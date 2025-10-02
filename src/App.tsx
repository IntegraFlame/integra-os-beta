
/** 
 * App root
 * Purpose: Provides router shell for the application. We keep a single Home route
 * and handle internal views (Home/About/Main) within Home to match existing UX.
 */

import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

// Import the Home component correctly
import Home from './pages/Home'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}
