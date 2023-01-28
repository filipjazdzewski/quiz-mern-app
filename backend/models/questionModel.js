const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  typeOfQuestion: {
    type: String,
    required: [true, 'Please choose the question type'],
    enum: ['SingleChoice', 'MultipleChoices', 'TrueOrFalse'],
    default: 'SingleChoice',
  },
  questionTitle: {
    type: String,
    required: [true, 'Please add a question content'],
    max: 80,
  },
  options: [
    {
      optionTitle: {
        type: String,
        required: [true, 'Please add a question title'],
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model('Question', questionSchema);
