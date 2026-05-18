import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import './MyOrders.css'

const MyOrders = () => {
  const { token } = useContext(StoreContext)
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://10.173.239.142:5000/api/order/userorders', {
        headers: { token }
      })
      if (res.data.success) setOrders(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
      const interval = setInterval(() => {
        fetchOrders()
      }, 5000) // refresh every 5 seconds
      return () => clearInterval(interval)
    }
  }, [token])

  const getStatusColor = (status) => {
    if (status === 'Delivered') return 'green'
    if (status === 'Out for Delivery') return 'orange'
    return 'tomato'
  }

  const getStatusIcon = (status) => {
    if (status === 'Delivered') return '✅'
    if (status === 'Out for Delivery') return '🚗'
    return '🍳'
  }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      {orders.length === 0 && <p>No orders yet!</p>}
      {orders.map((order) => (
        <div key={order._id} className='order-card'>
          <div className='order-items'>
            <p><b>Items:</b> {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</p>
            <p><b>Total:</b> ₹{order.amount}</p>
            <p><b>Date:</b> {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div className='order-status'>
            <p style={{ color: getStatusColor(order.status), fontWeight: 'bold', fontSize: '16px' }}>
              {getStatusIcon(order.status)} {order.status}
            </p>
            <button onClick={fetchOrders}>🔄 Refresh</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyOrders
