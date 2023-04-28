import React from 'react';
import '../styles/Home.css';

const Home = () => {
  const handlePlayNowClick = () => {
    window.location.href = '/game';
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
