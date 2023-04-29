import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../styles/ScoreForm.css';

const ScoreForm = ({ onSubmit }) => {
    const { state } = useLocation();
    const score = state?.score || 0;
    const [name, setName] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(name, score);
      navigate('/');
    };

    return (
        <div className="score-form-container">
          <h2>Congratulations, you scored {score}/10!</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="name">Enter your name to be added to the leaderboard:  </Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className = 'submit-button'>Submit</Button>
          </Form>
        </div>
      );
};

export default ScoreForm;
