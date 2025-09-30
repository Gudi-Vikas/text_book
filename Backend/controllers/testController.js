import Question from '../models/Question.js';

// @desc    Get all questions for the test
// @route   GET /api/test/start
// @access  Public
const startTest = async (req, res) => {
  try {
    const questions = await Question.find({}, { answer: 0 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Submit test and get score
// @route   POST /api/test/submit
// @access  Public
const submitTest = async (req, res) => {
  const userAnswers = req.body;

  try {
    const questionIds = userAnswers.map((answer) => answer.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    let score = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers.find(
        (answer) => answer.questionId === question._id.toString()
      );
      if (userAnswer && userAnswer.selectedOption === question.answer) {
        score++;
      }
    });

    res.json({ score, totalQuestions: questions.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { startTest, submitTest };
