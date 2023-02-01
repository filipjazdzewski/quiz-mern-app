const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuiz,
  createQuiz,
  deleteQuiz,
  updateQuiz,
  likeQuiz,
  unlikeQuiz,
} = require('../controllers/quizController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getQuizzes).post(protect, createQuiz);

router
  .route('/:id')
  .get(protect, getQuiz)
  .delete(protect, deleteQuiz)
  .put(protect, updateQuiz);

router.route('/like/:id').put(protect, likeQuiz);

router.route('/unlike/:id').put(protect, unlikeQuiz);

module.exports = router;
