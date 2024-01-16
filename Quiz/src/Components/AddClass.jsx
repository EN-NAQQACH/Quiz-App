import React, { useState } from 'react';

function Class() {
  const [class_name, setClass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log(token);

    const res = await fetch("https://quiz-app.eroslabs.live/api/classes/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ class_name }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 200) {
      alert('Class added successfully');
      setClass('')
    }else if(res.status === 403){
      alert('User is not a Teacher');
    }
  };

  return (
    <div className="Content-Class">
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
