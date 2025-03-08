const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    topic: {
      type: String,
      required: true,
      trim: true
    },
    questions: [{
      question: {
        type: String,
        required: true
      },
      options: [{
        type: String,
        required: true
      }],
      correctAnswer: {
        type: String,
        required: true
      }
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Quiz', QuizSchema);