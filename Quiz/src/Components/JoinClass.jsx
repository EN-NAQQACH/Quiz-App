import React, { useState } from 'react';

function JoinClass() {
  const [classId, setClass] = useState('');

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

  return (
    <div className="Content-Class">
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
