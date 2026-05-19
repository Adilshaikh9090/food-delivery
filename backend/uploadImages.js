require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const Food = require('./models/foodModel');
const mongoose = require('mongoose');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const foodData = [
  { name: "Greek salad", price: 12, description: "Food provides essential nutrients", category: "Salad", image: "food_1.png" },
  { name: "Veg salad", price: 18, description: "Food provides essential nutrients", category: "Salad", image: "food_2.png" },
  { name: "Clover Salad", price: 16, description: "Food provides essential nutrients", category: "Salad", image: "food_3.png" },
  { name: "Chicken Salad", price: 24, description: "Food provides essential nutrients", category: "Salad", image: "food_4.png" },
  { name: "Lasagna Rolls", price: 14, description: "Food provides essential nutrients", category: "Rolls", image: "food_5.png" },
  { name: "Peri Peri Rolls", price: 12, description: "Food provides essential nutrients", category: "Rolls", image: "food_6.png" },
  { name: "Chicken Rolls", price: 20, description: "Food provides essential nutrients", category: "Rolls", image: "food_7.png" },
  { name: "Veg Rolls", price: 15, description: "Food provides essential nutrients", category: "Rolls", image: "food_8.png" },
  { name: "Ripple Ice Cream", price: 14, description: "Food provides essential nutrients", category: "Deserts", image: "food_9.png" },
  { name: "Fruit Ice Cream", price: 22, description: "Food provides essential nutrients", category: "Deserts", image: "food_10.png" },
  { name: "Jar Ice Cream", price: 10, description: "Food provides essential nutrients", category: "Deserts", image: "food_11.png" },
  { name: "Vanilla Ice Cream", price: 12, description: "Food provides essential nutrients", category: "Deserts", image: "food_12.png" },
  { name: "Chicken Sandwich", price: 12, description: "Food provides essential nutrients", category: "Sandwich", image: "food_13.png" },
  { name: "Vegan Sandwich", price: 18, description: "Food provides essential nutrients", category: "Sandwich", image: "food_14.png" },
  { name: "Grilled Sandwich", price: 16, description: "Food provides essential nutrients", category: "Sandwich", image: "food_15.png" },
  { name: "Bread Sandwich", price: 24, description: "Food provides essential nutrients", category: "Sandwich", image: "food_16.png" },
  { name: "Cup Cake", price: 14, description: "Food provides essential nutrients", category: "Cake", image: "food_17.png" },
  { name: "Vegan Cake", price: 12, description: "Food provides essential nutrients", category: "Cake", image: "food_18.png" },
  { name: "Butterscotch Cake", price: 20, description: "Food provides essential nutrients", category: "Cake", image: "food_19.png" },
  { name: "Sliced Cake", price: 15, description: "Food provides essential nutrients", category: "Cake", image: "food_20.png" },
  { name: "Garlic Mushroom", price: 14, description: "Food provides essential nutrients", category: "Pure Veg", image: "food_21.png" },
  { name: "Fried Cauliflower", price: 22, description: "Food provides essential nutrients", category: "Pure Veg", image: "food_22.png" },
  { name: "Mix Veg Pulao", price: 10, description: "Food provides essential nutrients", category: "Pure Veg", image: "food_23.png" },
  { name: "Rice Zucchini", price: 12, description: "Food provides essential nutrients", category: "Pure Veg", image: "food_24.png" },
  { name: "Cheese Pasta", price: 12, description: "Food provides essential nutrients", category: "Pasta", image: "food_25.png" },
  { name: "Tomato Pasta", price: 18, description: "Food provides essential nutrients", category: "Pasta", image: "food_26.png" },
  { name: "Creamy Pasta", price: 16, description: "Food provides essential nutrients", category: "Pasta", image: "food_27.png" },
  { name: "Chicken Pasta", price: 24, description: "Food provides essential nutrients", category: "Pasta", image: "food_28.png" },
  { name: "Butter Noodles", price: 14, description: "Food provides essential nutrients", category: "Noodles", image: "food_29.png" },
  { name: "Veg Noodles", price: 12, description: "Food provides essential nutrients", category: "Noodles", image: "food_30.png" },
  { name: "Somen Noodles", price: 20, description: "Food provides essential nutrients", category: "Noodles", image: "food_31.png" },
  { name: "Cooked Noodles", price: 15, description: "Food provides essential nutrients", category: "Noodles", image: "food_32.png" },
]

const uploadAll = async () => {
  await mongoose.connect(process.env.MONGO_URL)
  console.log('✅ MongoDB Connected!')

  for (const food of foodData) {
    const imagePath = path.join(__dirname, '../frontend/src/assets', food.image)
    if (!fs.existsSync(imagePath)) {
      console.log(`❌ Image not found: ${food.image}`)
      continue
    }
    const result = await cloudinary.uploader.upload(imagePath, { folder: 'food-delivery' })
    const newFood = new Food({
      name: food.name,
      price: food.price,
      description: food.description,
      category: food.category,
      image: result.secure_url
    })
    await newFood.save()
    console.log(`✅ Uploaded: ${food.name}`)
  }

  console.log('🎉 All foods uploaded!')
  process.exit()
}

uploadAll()
