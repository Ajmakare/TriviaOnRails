import React, { useState, useEffect } from 'react';

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

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
    } else {
      setFeedback('Incorrect!');
    }

    setUserAnswer('');
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setFeedback('');
    setUserAnswer(''); // Clear the user's answer when moving to the next question
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{questions[currentQuestionIndex].question}</p>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => {
          setUserAnswer(e.target.value);
          setFeedback(''); // Clear the feedback when the user types a new answer
        }}
        placeholder="Your answer"
      />
      <button onClick={handleSubmit}>Submit</button>
      {feedback && <p>{feedback}</p>}
      {currentQuestionIndex < questions.length - 1 && (
        <button onClick={handleNextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
};

export default Game;
