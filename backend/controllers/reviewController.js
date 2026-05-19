const Review = require('../models/reviewModel');
const jwt = require('jsonwebtoken');

const addReview = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const existing = await Review.findOne({ foodId: req.body.foodId, userId });
    if (existing) {
      await Review.findByIdAndUpdate(existing._id, {
        rating: req.body.rating,
        comment: req.body.comment
      });
      return res.json({ success: true, message: 'Review updated' });
    }

    const review = new Review({
      foodId: req.body.foodId,
      userId,
      rating: req.body.rating,
      comment: req.body.comment
    });
    await review.save();
    res.json({ success: true, message: 'Review added' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ foodId: req.params.foodId });
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
    res.json({ success: true, reviews, avgRating: avgRating.toFixed(1) })
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = { addReview, getReviews };
