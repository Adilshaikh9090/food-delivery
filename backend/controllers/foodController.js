const Food = require('../models/foodModel');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const addFood = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'food-delivery'
    });
    fs.unlinkSync(req.file.path);

    const food = new Food({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url
    });
    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    if (food.image.includes('cloudinary')) {
      const publicId = food.image.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`food-delivery/${publicId}`)
    }
    await Food.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = { addFood, listFood, removeFood };
