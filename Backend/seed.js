const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Question = require('./models/Question.js');
const questions = require('./questions.json');
const dotenv = require('dotenv');

dotenv.config();

const seedQuestions = async () => {
  try {
    await connectDB();
    await Question.deleteMany();
    console.log('Questions cleared');

    await Question.insertMany(questions);
    console.log('Questions seeded');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedQuestions();
