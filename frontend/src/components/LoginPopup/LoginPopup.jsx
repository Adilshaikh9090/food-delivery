import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { setToken } = useContext(StoreContext)

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      let url = currState === 'Login'
       ? 'https://food-delivery-backend-qpx8.onrender.com/api/user/login'
: 'https://food-delivery-backend-qpx8.onrender.com/api/user/register'

      const res = await axios.post(url, data)
      if (res.data.success) {
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        setShowLogin(false)
      } else {
        setError(res.data.message)
      }
    } catch (err) {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input name="name" type="text" placeholder="Your name" onChange={onChangeHandler} required />
          )}
          <input name="email" type="email" placeholder="Your email" onChange={onChangeHandler} required />
          <input name="password" type="password" placeholder="Password" onChange={onChangeHandler} required />
        </div>
        {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
        <button type='submit'>
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
