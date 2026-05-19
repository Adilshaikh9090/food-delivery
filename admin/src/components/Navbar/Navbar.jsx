import React from 'react'
import './Navbar.css'

const Navbar = ({ handleLogout }) => {
  return (
    <nav className='admin-navbar'>
      <div className='navbar-brand'>
        <span className='brand-icon'>🍔</span>
        <span className='brand-name'>Tomato Admin</span>
      </div>
      <button onClick={handleLogout} className='logout-btn'>
        <span>Logout</span>
        <span>→</span>
      </button>
    </nav>
  )
}

export default Navbar
