import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, token } = useContext(StoreContext)
  const [showReview, setShowReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [avgRating, setAvgRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const fetchRating = async () => {
    const res = await axios.get(`https://food-delivery-backend-qpx8.onrender.com/api/review/${id}`)
    if (res.data.success) setAvgRating(res.data.avgRating)
  }

  React.useEffect(() => { fetchRating() }, [])

  const submitReview = async () => {
    if (!token) { alert('Please login to rate!'); return }
    if (rating === 0) { alert('Please select a star rating!'); return }
    const res = await axios.post('https://food-delivery-backend-qpx8.onrender.com/api/review/add',
      { foodId: id, rating, comment },
      { headers: { token } }
    )
    if (res.data.success) {
      setSubmitted(true)
      setShowReview(false)
      fetchRating()
    }
  }

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={image} alt="" />
        {!cartItems[id]
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className='food-item-counter'>
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <span className='avg-rating' onClick={() => setShowReview(!showReview)} style={{cursor:'pointer'}}>
            ⭐ {avgRating > 0 ? avgRating : 'Rate'}
          </span>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>

        {showReview && (
          <div className='review-box'>
            <p style={{fontWeight:'600', marginBottom:'8px'}}>Rate this item:</p>
            <div className='star-rating'>
              {[1,2,3,4,5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  style={{fontSize:'24px', cursor:'pointer', color: star <= (hover || rating) ? '#ffc107' : '#ddd'}}
                >★</span>
              ))}
            </div>
            <textarea
              placeholder='Write a review (optional)'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='review-input'
            />
            <button onClick={submitReview} className='review-btn'>Submit</button>
            {submitted && <p style={{color:'green', fontSize:'12px'}}>✅ Review submitted!</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodItem
