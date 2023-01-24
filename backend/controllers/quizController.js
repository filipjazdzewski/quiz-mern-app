const asyncHandler = require('express-async-handler');

const Quiz = require('../models/quizModel');

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizes = await Quiz.find({});

  res.status(200).json(quizes);
});

// @desc    Create new quiz
// @route   POST /api/quizes
// @access  Private
const createQuiz = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please add a title');
  }

  const quiz = await Quiz.create({
    title,
    user: req.user._id,
  });

  res.status(201).json(quiz);
});

module.exports = {
  getAllQuizzes,
  createQuiz,
};
