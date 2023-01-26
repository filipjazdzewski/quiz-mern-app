const asyncHandler = require('express-async-handler');

const Quiz = require('../models/quizModel');
const Question = require('../models/questionModel');

// @desc    Get question
// @route   GET /api/questions/:id/:quizId
// @access  Private
const getQuestion = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (quiz.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  res.status(200).json(question);
});

// @desc    Create new question
// @route   POST /api/questions
// @access  Private
const createQuestion = asyncHandler(async (req, res) => {
  const { typeOfQuestion, questionTitle, options, quizId } = req.body;

  if (!questionTitle || !quizId) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (quiz.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const question = await Question.create({
    typeOfQuestion,
    questionTitle,
    options,
  });

  await Quiz.findByIdAndUpdate(quizId, { $push: { questions: question._id } });

  res.status(200).json(question);
});

// @desc    Delete question
// @route   DELETE /api/questions/:id/:quizId
// @access  Private
const deleteQuestion = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (quiz.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  // Delete Question from Quiz and from Question Collection
  await Quiz.updateOne(
    { _id: req.params.quizId },
    { $pull: { questions: req.params.id } }
  );
  await question.remove();

  res.status(200).json({ success: true });
});

// @desc    Update question
// @route   PUT /api/questions/:id/:quizId
// @access  Private
const updateQuestion = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (quiz.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  await Question.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });

  const updatedQuestion = await Question.findById(req.params.id);

  res.status(200).json(updatedQuestion);
});

module.exports = {
  getQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
};
