import React, { useState } from 'react'
import axios from 'axios'
import './AddFood.css'

const categories = ["Salad","Rolls","Deserts","Sandwich","Cake","Pure Veg","Pasta","Noodles"]

const AddFood = () => {
  const [image, setImage] = useState(null)
  const [data, setData] = useState({ name: '', description: '', price: '', category: 'Salad' })
  const [loading, setLoading] = useState(false)

  const onChangeHandler = (e) => setData({ ...data, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('image', image)
    try {
      const res = await axios.post('https://food-delivery-backend-qpx8.onrender.com/api/food/add', formData)
      if (res.data.success) {
        alert('✅ Food Added!')
        setData({ name: '', description: '', price: '', category: 'Salad' })
        setImage(null)
      }
    } catch (err) {
      alert('❌ Error adding food')
    }
    setLoading(false)
  }

  return (
    <div className='add-food-page'>
      <div className='page-header'>
        <h1>Add New Item</h1>
        <p>Add a new food item to your menu</p>
      </div>
      <div className='add-food-card'>
        <form onSubmit={onSubmit}>
          <div className='image-upload-area' onClick={() => document.getElementById('fileInput').click()}>
            {image
              ? <img src={URL.createObjectURL(image)} alt='preview' className='image-preview' />
              : <div className='upload-placeholder'>
                  <span className='upload-icon'>📸</span>
                  <p>Click to upload image</p>
                </div>
            }
            <input id='fileInput' type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} required style={{display:'none'}} />
          </div>
          <div className='form-grid'>
            <div className='field'>
              <label>Food Name</label>
              <input name='name' value={data.name} onChange={onChangeHandler} placeholder='e.g. Chicken Burger' required />
            </div>
            <div className='field'>
              <label>Category</label>
              <select name='category' value={data.category} onChange={onChangeHandler}>
                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className='field full'>
              <label>Description</label>
              <textarea name='description' value={data.description} onChange={onChangeHandler} placeholder='Describe the dish...' required />
            </div>
            <div className='field'>
              <label>Price (₹)</label>
              <input name='price' type='number' value={data.price} onChange={onChangeHandler} placeholder='0.00' required />
            </div>
          </div>
          <button type='submit' className='submit-btn' disabled={loading}>
            {loading ? 'Adding...' : '+ Add to Menu'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddFood
