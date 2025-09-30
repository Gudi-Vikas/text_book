import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchQuestions,
  submitTest,
  answerQuestion,
  nextQuestion,
  prevQuestion,
} from '../../features/testSlice';
import './TestPage.css';

const TestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, questions, currentQuestionIndex, userAnswers } = useSelector(
    (state) => state.test
  );

  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const timerRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [status, dispatch]);

  const handleAnswerChange = (optionIndex) => {
    const questionId = questions[currentQuestionIndex]._id;
    dispatch(answerQuestion({ questionId, selectedOption: optionIndex + 1 }));
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  };

  const handleSubmit = () => {
    const answers = Object.keys(userAnswers).map((questionId) => ({
      questionId,
      selectedOption: userAnswers[questionId],
    }));
    dispatch(submitTest(answers)).then(() => {
      navigate('/result');
    });
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      handleSubmit();
    }
  }, [timeLeft]);

  if (status === 'loading' || status === 'idle') {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="test-page">
      <div className="timer">{`Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</div>
      <div className="question-container">
        <h2>{`Question ${currentQuestionIndex + 1}/${questions.length}`}</h2>
        <p>{currentQuestion.question}</p>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option-${index}`}
                name={`question-${currentQuestion._id}`}
                value={index}
                checked={userAnswers[currentQuestion._id] === index + 1}
                onChange={() => handleAnswerChange(index)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
          Save & Next
        </button>
        <button onClick={handleSubmit} className="submit-button">
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default TestPage;
