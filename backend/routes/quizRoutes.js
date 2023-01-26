const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuiz,
  createQuiz,
  deleteQuiz,
  updateQuiz,
} = require('../controllers/quizController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getQuizzes).post(protect, createQuiz);

router
  .route('/:id')
  .get(protect, getQuiz)
  .delete(protect, deleteQuiz)
  .put(protect, updateQuiz);

module.exports = router;
