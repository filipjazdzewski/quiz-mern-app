const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuiz,
  createQuiz,
  deleteQuiz,
  updateQuiz,
  postQuizGame,
  likeQuiz,
  unlikeQuiz,
} = require('../controllers/quizController');

const { protect } = require('../middleware/authMiddleware');

// Re-route into question router
const questionRouter = require('./questionRoutes');
router.use('/:quizId/questions', questionRouter);

router.route('/').get(getQuizzes).post(protect, createQuiz);

router
  .route('/:id')
  .get(protect, getQuiz)
  .delete(protect, deleteQuiz)
  .put(protect, updateQuiz);

router.route('/:id/games').post(protect, postQuizGame);

router.route('/like/:id').put(protect, likeQuiz);

router.route('/unlike/:id').put(protect, unlikeQuiz);

module.exports = router;
