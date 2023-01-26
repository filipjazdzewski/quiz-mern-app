const express = require('express');
const router = express.Router();
const {
  getQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} = require('../controllers/questionController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createQuestion);

router
  .route('/:id/:quizId')
  .get(protect, getQuestion)
  .delete(protect, deleteQuestion)
  .put(protect, updateQuestion);

module.exports = router;
