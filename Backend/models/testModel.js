import mongoose from "mongoose"

const testSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    unique: true, // Ensures you don't have two 'maths' tests
    trim: true,
    lowercase: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question' // This creates a reference to documents in the Question collection
  }],
  duration: {
    type: Number, // Duration in minutes
    required: true,
    default: 60
  }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;