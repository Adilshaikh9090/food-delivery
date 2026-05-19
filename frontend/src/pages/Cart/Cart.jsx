import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          const qty = cartItems[item._id] || 0
          if (qty > 0) {
            return (
              <div key={item._id} className='cart-items-title cart-items-item'>
              <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{qty}</p>
                <p>₹{item.price * qty}</p>
                <p onClick={() => removeFromCart(item._id)}>x</p>
              </div>
            )
          }
          return null
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => {
            if (getTotalCartAmount() === 0) {
              alert("Cart is empty!")
            } else if (!localStorage.getItem('token')) {
              alert("Please login first!")
            } else {
              navigate('/order')
            }
          }}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
