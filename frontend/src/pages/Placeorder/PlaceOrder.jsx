import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, setCartItems } = useContext(StoreContext)
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [showSuccess, setShowSuccess] = useState(false)

  const [data, setData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '',
    zipcode: '', country: '', phone: ''
  })

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const placeOrder = async (e) => {
    e.preventDefault()

    let orderItems = []
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] })
      }
    })

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }

    try {
      const res = await axios.post('https://food-delivery-backend-qpx8.onrender.com/api/order/place', orderData, {
        headers: { token }
      })
      if (res.data.success) {
        setCartItems({})
       setShowSuccess(true)
setTimeout(() => {
  setShowSuccess(false)
  setCartItems({})
  navigate('/')
}, 3000)
      } else {
        alert('❌ Failed to place order')
      }
    } catch (err) {
      alert('❌ Something went wrong')
    }
  }

  return (
    <form className='place-order' onSubmit={placeOrder}>
      {showSuccess && (
  <div className='order-success-overlay'>
    <div className='order-success-card'>
      <div className='success-icon'>🎉</div>
      <h2>Order Placed!</h2>
      <p>Your delicious food is being prepared.</p>
      <p className='success-sub'>We'll deliver it to you soon! 🚀</p>
      <div className='success-progress'></div>
    </div>
  </div>
)}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} type="text" placeholder='First name' required />
          <input name='lastName' onChange={onChangeHandler} type="text" placeholder='Last name' required />
        </div>
        <input name='email' onChange={onChangeHandler} type="email" placeholder='Email address' required />
        <input name='street' onChange={onChangeHandler} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} type="text" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} type="text" placeholder='Zip code' required />
          <input name='country' onChange={onChangeHandler} type="text" placeholder='Country' required />
        </div>
        <input name='phone' onChange={onChangeHandler} type="text" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          {/* Payment Method */}
          <p style={{ fontWeight: '600', margin: '16px 0 10px' }}>Payment Method:</p>
          <div className='payment-options'>
            <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
              <input
                type='radio'
                name='payment'
                value='cod'
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              💵 Cash on Delivery
            </label>
            <label
              className='payment-option disabled'
              onClick={() => alert('🚫 Online payment is not available at this time!')}
            >
              <input type='radio' name='payment' value='online' disabled />
              💳 Online Payment
              <span className='not-available'>Not Available</span>
            </label>
          </div>

          <button type="submit">
            💵 PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
