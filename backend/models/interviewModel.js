const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    idealAnswer: {
      type: String,
      required: true
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    questionIndex: {
      type: Number
    },
    userAnswer: {
      type: String
    },
    feedback: {
      type: String
    },
    score: {
      type: Number
    }
  }],
  completed: {
    type: Boolean,
    default: false
  },
  overallFeedback: {
    type: String
  },
  overallScore: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Interview', InterviewSchema);