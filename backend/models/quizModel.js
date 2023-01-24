const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  typeOfQuestion: {
    type: String,
    required: [true, 'Please choose the question type'],
    enum: ['SingleChoice', 'MultipleChoices', 'TrueOrFalse'],
    default: 'SingleChoice',
  },
  question: {
    type: String,
    required: [true, 'Please add a question content'],
  },
  options: [
    {
      option: {
        type: String,
        isCorrect: Boolean,
        required: [true, 'Please add an option'],
      },
    },
  ],
});

const quizSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a quiz title'],
    },
    questions: [questionSchema],
    ranking: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', quizSchema);
