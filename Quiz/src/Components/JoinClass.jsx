import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinClass() {
  const [classId, setClass] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log(token);

    const res = await fetch("https://quiz-app.eroslabs.live/api/classes/join", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ classId }),
    });

    const data = await res.json();
    console.log(data);
  };
  useEffect(()=>{
    if (!localStorage.getItem('token')) {
      navigate('/Login');
    }
  },[navigate])
  return (
    <div className="Content">
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
