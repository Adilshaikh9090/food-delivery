const Food = require('../models/foodModel');
const fs = require('fs');

const addFood = async (req, res) => {
  const image_filename = req.file.filename;
  const food = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });
  try {
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
    fs.unlink(`uploads/${food.image}`, () => {});
    await Food.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = { addFood, listFood, removeFood };
