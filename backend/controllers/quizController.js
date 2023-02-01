const asyncHandler = require('express-async-handler');

const Quiz = require('../models/quizModel');
const Question = require('../models/questionModel');

// @desc    Get quizzes
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = asyncHandler(async (req, res) => {
  const { search } = req.query;

  if (search) {
    const quizzes = await Quiz.aggregate([
      { $project: { _id: 1, title: 1, questions: 1, ranking: 1 } },
      { $match: { title: { $regex: new RegExp(search), $options: 'i' } } },
      { $sort: { updatedAt: -1 } },
    ]);

    await Question.populate(quizzes, { path: 'questions' });

    res.status(200).json(quizzes);
  }

  const quizzes = await Quiz.find({})
    .sort({ updatedAt: -1 })
    .populate('questions');

  res.status(200).json(quizzes);
});

// @desc    Get quiz
// @route   GET /api/quizzes/:id
// @access  Private
const getQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate('questions');

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  res.status(200).json(quiz);
});

// @desc    Create new quiz
// @route   POST /api/quizzes
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

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (quiz.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // Delete Quiz and the Questions it has
  await Question.deleteMany({ _id: { $in: quiz.questions } });
  await quiz.remove();

  res.status(200).json(quiz);
});

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private
const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (quiz.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await Quiz.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });

  const updatedQuiz = await Quiz.findById(req.params.id);

  res.status(200).json(updatedQuiz);
});

// @desc    Like quiz
// @route   PUT /api/quizzes/like
// @access  Private
const likeQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (quiz.likes.includes(req.user._id)) {
    res.status(404);
    throw new Error('This quiz is already liked by you');
  }

  await Quiz.findByIdAndUpdate(req.params.id, {
    $push: { likes: req.user._id },
  });

  const updatedQuiz = await Quiz.findById(req.params.id);

  res.status(200).json(updatedQuiz);
});

// @desc    Unlike quiz
// @route   PUT /api/quizzes/unlike
// @access  Private
const unlikeQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (!quiz.likes.includes(req.user._id)) {
    res.status(404);
    throw new Error('You cannot unlike a quiz u did not like');
  }

  await Quiz.findByIdAndUpdate(req.params.id, {
    $pull: { likes: req.user._id },
  });

  const updatedQuiz = await Quiz.findById(req.params.id);

  res.status(200).json(updatedQuiz);
});

module.exports = {
  getQuizzes,
  getQuiz,
  createQuiz,
  deleteQuiz,
  updateQuiz,
  likeQuiz,
  unlikeQuiz,
};
