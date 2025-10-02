
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
function App() {
    return (
      <div style={{
          minHeight: "100vh",
          backgroundColor: "#121212",
          color: "#e0e0e0",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px"
      }}>
          <div style={{
              backgroundColor: "#1e1e1e",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(92, 219, 255, 0.3)",
              maxWidth: "600px"
          }}>
              <h1 style={{
                  color: "#5cdbff",
                  marginBottom: "20px",
                  textShadow: "0 0 10px rgba(92, 219, 255, 0.7)"
              }}>
                  Integra O/S Interface
              </h1>
              <p>Advanced consciousness integration system</p>
              <p>🎉 React app is now working correctly!</p>
              <div style={{ marginTop: "20px" }}>
                  <button style={{
                      padding: "10px 20px",
                      background: "#5cdbff",
                      color: "#121212",
                      border: "none",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      cursor: "pointer"
                  }}>
                      Enter Interface
                  </button>
              </div>
              <div style={{ marginTop: "20px", fontSize: "0.9em", opacity: "0.7" }}>
                  <p>Domain: {window.location.hostname}</p>
                  <p>Path: {window.location.pathname}</p>
              </div>
          </div>
      </div>
  );
}

export default App;
