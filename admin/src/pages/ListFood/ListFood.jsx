import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ListFood.css'

const ListFood = () => {
  const [foods, setFoods] = useState([])

  const fetchFoods = async () => {
    const res = await axios.get('http://localhost:5000/api/food/list')
    if (res.data.success) setFoods(res.data.data)
  }

  const removeFood = async (id) => {
    await axios.post('http://localhost:5000/api/food/remove', { id })
    fetchFoods()
  }

  useEffect(() => { fetchFoods() }, [])

  return (
    <div className='list-food'>
      <h2>All Food Items</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td><img src={`http://localhost:5000/images/${food.image}`} alt={food.name} /></td>
              <td>{food.name}</td>
              <td>{food.category}</td>
              <td>${food.price}</td>
              <td><button onClick={() => removeFood(food._id)}>❌ Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListFood
