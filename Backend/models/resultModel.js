import mongoose from "mongoose"

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assumes you have a User model for authentication
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number, // Time in seconds
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;