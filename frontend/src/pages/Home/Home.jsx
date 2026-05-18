import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <div className='search-bar'>
        <input
          type='text'
          placeholder='🔍 Search for food...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <FoodDisplay category={category} search={search} />
      <AppDownload />
    </div>
  )
}

export default Home
