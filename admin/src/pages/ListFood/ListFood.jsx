import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ListFood.css'

const ListFood = () => {
  const [foods, setFoods] = useState([])

  const fetchFoods = async () => {
    const res = await axios.get('https://food-delivery-backend-qpx8.onrender.com/api/food/list')
    if (res.data.success) setFoods(res.data.data)
  }

  const removeFood = async (id) => {
    if (window.confirm('Remove this item?')) {
      await axios.post('https://food-delivery-backend-qpx8.onrender.com/api/food/remove', { id })
      fetchFoods()
    }
  }

  useEffect(() => { fetchFoods() }, [])

  return (
    <div className='list-page'>
      <div className='page-header'>
        <h1>Food List</h1>
        <p>{foods.length} items on menu</p>
      </div>
      <div className='food-grid'>
        {foods.map((food) => (
          <div key={food._id} className='food-card'>
            <img src={food.image} alt={food.name} />
            <div className='food-card-info'>
              <span className='food-category'>{food.category}</span>
              <h3>{food.name}</h3>
              <p className='food-price'>₹{food.price}</p>
            </div>
            <button onClick={() => removeFood(food._id)} className='delete-btn'>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListFood
