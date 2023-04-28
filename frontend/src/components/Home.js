import React from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handlePlayNowClick = () => {
    navigate('/game');
  };

  return (
    <div className="home-container">
      <h2>Welcome to Trivia on Rails!</h2>
      <p>A state of the art trivia application built with Ruby on Rails and React</p>
      <button style = {{margin:'auto'}} className="play-now-button" onClick={handlePlayNowClick}>Play Now</button>
    </div>
  );
};


export default Home;
