const asyncHandler = require('express-async-handler');

const Quiz = require('../models/quizModel');
const Question = require('../models/questionModel');

// @desc    Get questions
// @route   GET /api/quizzes/:quizId/questions
// @access  Public
const getQuestions = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  const questions = await Question.find({ quiz: req.params.quizId });

  res.status(200).json(questions);
});

// @desc    Create new question
// @route   POST /api/quizzes/:quizId/questions
// @access  Private
const createQuestion = asyncHandler(async (req, res) => {
  const quizId = req.params.quizId;
  const { questionType, questionText, options, correctAnswers } = req.body;

  if (!questionType || !questionText || !options || !correctAnswers) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  if (options.length < 2 && questionType !== 'ShortAnswer') {
    res.status(400);
    throw new Error('Minimum 2 options');
  } else if (options.length > 6) {
    res.status(400);
    throw new Error('Maximum 6 options');
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
    questionType,
    questionText,
    options,
    correctAnswers,
    quiz: quiz._id,
  });

  await Quiz.findByIdAndUpdate(quizId, { $push: { questions: question._id } });

  res.status(200).json(question);
});

// @desc    Delete question
// @route   DELETE /api/quizzes/:quizId/questions/:id
// @access  Private
const deleteQuestion = asyncHandler(async (req, res) => {
  const quizId = req.params.quizId;
  const questionId = req.params.id;

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (quiz.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const question = await Question.findById(questionId);

  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  // Delete Question from Quiz and from Question Collection
  await Quiz.updateOne({ _id: quizId }, { $pull: { questions: questionId } });
  await question.remove();

  res.status(200).json(question);
});

// @desc    Update question
// @route   PUT /api/quizzes/:quizId/questions/:id
// @access  Private
const updateQuestion = asyncHandler(async (req, res) => {
  const quizId = req.params.quizId;
  const questionId = req.params.id;

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  if (quiz.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const question = await Question.findById(questionId);

  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  await Question.findByIdAndUpdate(questionId, {
    $set: req.body,
  });

  const updatedQuestion = await Question.findById(req.params.id);

  res.status(200).json(updatedQuestion);
});

module.exports = {
  getQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
};
