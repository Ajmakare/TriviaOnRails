import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {CircleLoader} from 'react-spinners';
import '../styles/Game.css';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correct, setCorrect] = useState(3);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jservice.io/api/random?count=10');
        const data = response.data;
        setQuestions(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000); 
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmit = () => {
    if (userAnswer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
      setFeedback('Correct!');
      setCorrect(1);
      setScore((prevScore) => prevScore + 1);
    } else {
      setCorrect(2);
      setFeedback('Incorrect! The correct answer was: ' + questions[currentQuestionIndex].answer + '.'); 
    }
    setUserAnswer('');
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setFeedback('');
    setUserAnswer(''); 
    setCorrect(3);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (loading) {
    return <div className='loader-container'><CircleLoader color = 'rgba(197, 28, 28, 1)' size = '200'/></div>;
  }

  return (
    <div className="game-container">
      <div className="question-container">
      {correct === 1? (
        <img src="/assets/thumbsup.png" height="110px" width="110px" />
      ) : correct === 2 ? (
        <img src="/assets/thumbsdown.webp" height="130px" width="130px" />
      ) : correct === 3 ? (
        <img src="/assets/thinking.png" height="135px" width="135px" />
      ) : null}
      {feedback && <p className="feedback-message">{feedback}</p>}
        <h2>QUESTION {currentQuestionIndex + 1}</h2>
        <p>{questions[currentQuestionIndex].question}</p>
        <p>CATEGORY: {questions[currentQuestionIndex].category.title}</p>
      </div>
      <div className="progress-meter">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <input
        className="answer-input"
        type="text"
        value={userAnswer}
        onChange={(e) => {
          setUserAnswer(e.target.value);
          setFeedback('');
        }}
        placeholder="Your answer"
      />
        <div className="button-container">
          {currentQuestionIndex < questions.length - 1 && (
            <button className="next-question-button" onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
        {correct === 0 || correct === 3 ? (
          <button style={{ marginLeft: '20px' }} className="next-question-button" onClick={handleSubmit}>
            Submit
          </button>
        ) : null}
        {currentQuestionIndex === questions.length - 1 && (
          <button
          style={{ marginLeft: '20px' }}
          className="next-question-button"
          onClick={() =>
            navigate('/score-form', { state: { score: score } })
          }
        >
          Finish
        </button>
        )}
        </div>
    </div>
  );
};

export default Game;
