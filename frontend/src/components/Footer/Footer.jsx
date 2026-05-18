import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id="footer">
      
      <div className="footer-content">

        {/* Left Section */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Logo" />

          <p>
            Welcome to our website ✨  
            We provide quality service with fast delivery and the best customer experience. 
            Thank you for visiting our platform 💙
          </p>

          <div className="footer-social-icons">

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>

            <a href="https://twitter.com/adz__18" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>

          </div>
        </div>

        {/* Center Section */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>

          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>

          <ul>
            <li>📞 7676734548</li>
            <li>📧 adilshaikh4541@gmail.com</li>
            <li>📍 Karnataka, India</li>
          </ul>
        </div>

      </div>

      <hr />

      {/* Copyright */}
      <p className="footer-copyright">
        © 2026 Designed ✨ with 💙 by Adil Shaikh 🚀 |
        
        <a 
  href="https://instagram.com/adz__18"
  target="_blank"
  rel="noopener noreferrer"
>
  @adz__18
</a>

      </p>

    </div>
  )
}

export default Footer
