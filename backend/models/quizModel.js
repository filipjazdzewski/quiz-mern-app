const mongoose = require('mongoose');

const quizSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a quiz title'],
      max: 40,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
    negativePoints: {
      type: Boolean,
      default: false,
    },
    timeLimit: {
      type: Number,
      enum: [0, 30, 45, 60],
      default: 0,
    },
    randomQuestionOrder: {
      type: Boolean,
      default: false,
    },
    randomOptionOrder: {
      type: Boolean,
      default: false,
    },
    noBackOption: {
      type: Boolean,
      default: false,
    },
    ranking: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        score: {
          type: Number,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', quizSchema);
