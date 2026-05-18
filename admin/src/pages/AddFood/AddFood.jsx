import React, { useState } from 'react'
import axios from 'axios'
import './AddFood.css'

const categories = ["Salad","Rolls","Deserts","Sandwich","Cake","Pure Veg","Pasta","Noodles"]

const AddFood = () => {
  const [image, setImage] = useState(null)
  const [data, setData] = useState({ name: '', description: '', price: '', category: 'Salad' })

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('image', image)

    try {
      const res = await axios.post('http://localhost:5000/api/food/add', formData)
      if (res.data.success) {
        alert('✅ Food Added Successfully!')
        setData({ name: '', description: '', price: '', category: 'Salad' })
        setImage(null)
      }
    } catch (err) {
      alert('❌ Error adding food')
    }
  }

  return (
    <div className='add-food'>
      <h2>Add New Food Item</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Food Image</label>
          <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} required />
          {image && <img src={URL.createObjectURL(image)} alt='preview' className='preview' />}
        </div>
        <div className='form-group'>
          <label>Food Name</label>
          <input name='name' value={data.name} onChange={onChangeHandler} placeholder='Enter food name' required />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea name='description' value={data.description} onChange={onChangeHandler} placeholder='Enter description' required />
        </div>
        <div className='form-group'>
          <label>Category</label>
          <select name='category' value={data.category} onChange={onChangeHandler}>
            {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className='form-group'>
          <label>Price ($)</label>
          <input name='price' type='number' value={data.price} onChange={onChangeHandler} placeholder='Enter price' required />
        </div>
        <button type='submit'>Add Food</button>
      </form>
    </div>
  )
}

export default AddFood
