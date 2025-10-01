import mongoose from "mongoose"
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswerIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3 // Assuming 4 options, so indices are 0, 1, 2, 3
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;