import React, { useState, useEffect } from 'react';
import '../styles/Game.css';

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correct, setCorrect] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const proxyURL = 'https://api.allorigins.win/raw?url=';
      const response = await fetch(proxyURL + 'https://jservice.io/api/random?count=10');
      const data = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleSubmit = () => {
    if (userAnswer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
      setFeedback('Correct!');
      setCorrect(1);
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback('Incorrect! The correct answer was: ' + questions[currentQuestionIndex].answer + '.'); 
    }

    setUserAnswer('');
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setFeedback('');
    setUserAnswer(''); 
    setCorrect(0);
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="game-container">
      <div className="question-container">
        <h2>QUESTION {currentQuestionIndex + 1}</h2>
        <p>{questions[currentQuestionIndex].question}</p>
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
        {correct === 0 ? (
          <button style={{ marginLeft: '20px' }} className="next-question-button" onClick={handleSubmit}>
            Submit
          </button>
        ) : null}
        </div>
        {feedback && <p className="feedback-message">{feedback}</p>}

    </div>
  );
};

export default Game;
