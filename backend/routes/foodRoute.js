const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addFood, listFood, removeFood } = require('../controllers/foodController');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), addFood);
router.get('/list', listFood);
router.post('/remove', removeFood);

module.exports = router;
