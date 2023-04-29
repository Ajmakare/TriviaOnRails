import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Header from './components/Header';
import Footer from './components/Footer';
import ScoreForm from './components/ScoreForm';
import './App.css';
import axios from 'axios';

function App() {
  const [score, setScore] = useState(0);

  const handleScoreSubmit = async (name, score) => {
    try {
      const response = await axios.post('http://127.0.0.1:4567/scores', {
        username: name,
        score: score,
      });
  
      console.log('Score saved:', response.data);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route
            path="/score-form"
            element={<ScoreForm onSubmit={handleScoreSubmit} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
