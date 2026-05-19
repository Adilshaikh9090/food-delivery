import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('active')

  const fetchOrders = async () => {
    const res = await axios.get('https://food-delivery-backend-qpx8.onrender.com/api/order/list')
    if (res.data.success) setOrders(res.data.data)
  }

  const updateStatus = async (orderId, status) => {
    await axios.post('https://food-delivery-backend-qpx8.onrender.com/api/order/status', { orderId, status })
    fetchOrders()
  }

  useEffect(() => { fetchOrders() }, [])

  const filtered = filter === 'active'
    ? orders.filter(o => o.status !== 'Delivered')
    : orders

  const getStatusColor = (status) => {
    if (status === 'Delivered') return '#22c55e'
    if (status === 'Out for Delivery') return '#f59e0b'
    return '#ff4d2e'
  }

  return (
    <div className='orders-page'>
      <div className='orders-header'>
        <div>
          <h1>Orders</h1>
          <p>{filtered.length} orders</p>
        </div>
        <div className='filter-tabs'>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        </div>
      </div>
      <div className='orders-list'>
        {filtered.length === 0 && <div className='empty-state'>📭 No orders yet!</div>}
        {filtered.map((order) => (
          <div key={order._id} className='order-card'>
            <div className='order-top'>
              <span className='order-id'>#{order._id.slice(-6).toUpperCase()}</span>
              <span className='order-status' style={{ color: getStatusColor(order.status) }}>● {order.status}</span>
            </div>
            <div className='order-items-list'>
              {order.items.map((i, idx) => (
                <span key={idx} className='order-item-tag'>{i.name} ×{i.quantity}</span>
              ))}
            </div>
            <div className='order-bottom'>
              <div className='order-details'>
  <p>👤 {order.address.firstName} {order.address.lastName}</p>
  <p>📍 {order.address.street}, {order.address.city}</p>
  <p>📞 {order.address.phone}</p>
  <p className='order-amount'>₹{order.amount}</p>
</div>
              <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className='status-select'>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
