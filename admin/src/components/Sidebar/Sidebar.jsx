import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <aside className='admin-sidebar'>
      <NavLink to='/add' className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <span className='link-icon'>➕</span>
        <span className='link-text'>Add Food</span>
      </NavLink>
      <NavLink to='/list' className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <span className='link-icon'>📋</span>
        <span className='link-text'>Food List</span>
      </NavLink>
      <NavLink to='/orders' className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <span className='link-icon'>📦</span>
        <span className='link-text'>Orders</span>
      </NavLink>
    </aside>
  )
}

export default Sidebar
