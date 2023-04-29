import React, { useState, useEffect } from 'react';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://example.com/api/leaderboard');
      const data = await response.json();
      setLeaderboardData(data);
    };
    fetchData();
  }, []);

  return (
    <div className = 'leaderboard-container'>
      <h2>GLOBAL LEADERBOARD</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.score}/10</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
