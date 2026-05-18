import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/api/order/list')
    if (res.data.success) setOrders(res.data.data)
  }

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post('http://localhost:5000/api/order/status', { orderId, status })
      if (res.data.success) {
        alert('✅ Status updated!')
        fetchOrders()
      }
    } catch (err) {
      alert('❌ Failed to update status')
    }
  }

  useEffect(() => { fetchOrders() }, [])

  return (
    <div className='orders'>
      <h2>All Orders</h2>
      {orders.length === 0 && <p>No orders yet!</p>}
      {orders.map((order) => (
        <div key={order._id} className='order-item'>
          <div className='order-info'>
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Items:</b> {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</p>
            <p><b>Amount:</b> ₹{order.amount}</p>
            <p><b>Address:</b> {order.address.street}, {order.address.city}</p>
            <p><b>Phone:</b> {order.address.phone}</p>
          </div>
          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option value="Food Processing">Food Processing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  )
}

export default Orders
