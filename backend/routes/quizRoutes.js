const express = require('express');
const router = express.Router();
const { getAllQuizzes, createQuiz } = require('../controllers/quizController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getAllQuizzes).post(protect, createQuiz);

module.exports = router;
