import React, { useState, useEffect } from 'react';
import '../styles/Game.css';

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correct, setCorrect] = useState(3);
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

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
        </div>


    </div>
  );
};

export default Game;
