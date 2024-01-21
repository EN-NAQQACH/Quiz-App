import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Class() {
  const [class_name, setClass] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const res = await fetch("https://quiz-app.eroslabs.live/api/classes/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ class_name }),
    });

    const data = await res.json();
    if (res.status === 200) {
      alert('Class added successfully');
      setClass('')
    }else if(res.status === 403){
      alert('User is not a Teacher');
    }
  };
  useEffect(()=>{
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  },[navigate])

  return (
    <div className="content">
      <h2> Add new Class</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Class name"
          value={class_name}
          onChange={(e) => setClass(e.target.value)}
          required={true}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Class;
