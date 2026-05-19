import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import AddFood from './pages/AddFood/AddFood'
import ListFood from './pages/ListFood/ListFood'
import Orders from './pages/Orders/Orders'
import './App.css'

const ADMIN_PASSWORD = 'adil1234'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('adminLoggedIn') === 'true')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true')
        setIsLoggedIn(true)
      } else {
        setError('Incorrect password. Try again.')
      }
      setLoading(false)
    }, 600)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-bg">
          <div className="login-blob blob1"></div>
          <div className="login-blob blob2"></div>
        </div>
        <div className="login-card">
          <div className="login-logo">🍔</div>
          <h1 className="login-title">Tomato Admin</h1>
          <p className="login-subtitle">Sign in to manage your restaurant</p>
          <div className="login-form">
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="login-input"
              />
            </div>
            {error && <p className="login-error">⚠️ {error}</p>}
            <button onClick={handleLogin} className="login-btn" disabled={loading}>
              {loading ? <span className="btn-loader"></span> : 'Sign In →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      <Navbar handleLogout={handleLogout} />
      <div className="admin-body">
        <Sidebar />
        <main className="admin-main">
          <Routes>
            <Route path='/add' element={<AddFood />} />
            <Route path='/list' element={<ListFood />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/' element={<Navigate to='/add' />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
