import React from 'react';

const Home = () => {
  const handlePlayNowClick = () => {
    window.location.href = '/game';
  };

  return (
    <main>
      <h2>Welcome to Trivia on Rails!</h2>
      <p>Test your knowledge with our collection of trivia questions.</p>
      <button onClick={handlePlayNowClick}>Play Now</button>
    </main>
  );
};

export default Home;
