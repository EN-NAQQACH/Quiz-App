import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinClass() {
  const [classId, setClass] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const res = await fetch("https://quiz-app.eroslabs.live/api/classes/join", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ classId }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Successfully joined the class!');
    } else {
      alert('Failed to join the class. Please try again.');
    }
  };
  useEffect(()=>{
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  },[navigate])
  return (
    <div id="content">
      <h2> Join to a Class</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Class Id"
          value={classId}
          onChange={(e) => setClass(e.target.value)}
          required={true}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default JoinClass;
