import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <NavLink to='/add' className='sidebar-item'>➕ Add Items</NavLink>
      <NavLink to='/list' className='sidebar-item'>📋 List Items</NavLink>
      <NavLink to='/orders' className='sidebar-item'>📦 Orders</NavLink>
    </div>
  )
}

export default Sidebar
