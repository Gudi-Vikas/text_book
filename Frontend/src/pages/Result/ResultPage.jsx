import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetTest } from '../../features/testSlice';
import './ResultPage.css';

const ResultPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { score, totalQuestions } = useSelector((state) => state.test);

  const handleRetakeTest = () => {
    dispatch(resetTest());
    navigate('/test');
  };

  return (
    <div className="result-page">
      <h2>Test Results</h2>
      <p>{`You scored ${score} out of ${totalQuestions}`}</p>
      <button onClick={handleRetakeTest}>Take Test Again</button>
    </div>
  );
};

export default ResultPage;
