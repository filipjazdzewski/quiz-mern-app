const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  questionType: {
    type: String,
    enum: ['SingleChoice', 'MultipleChoices', 'TrueOrFalse', 'ShortAnswer'],
    required: [true, 'Please choose the question type'],
  },
  questionText: {
    type: String,
    required: [true, 'Please add a question text'],
    max: 80,
  },
  options: [{ type: String, required: true }],
  correctAnswers: [{ type: String, required: true }],
});

module.exports = mongoose.model('Question', questionSchema);
