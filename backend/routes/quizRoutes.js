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
  .get(getQuiz) // protect (Musze zrobic zeby play mogl wziac bez bycia autorem)
  .delete(protect, deleteQuiz)
  .put(protect, updateQuiz);

module.exports = router;
