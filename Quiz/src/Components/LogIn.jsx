import React, { useEffect, useState } from 'react';
import '../Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';

function LogIn({ setIsTeacher }) {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTeacher, setIsTeacherLocal] = useState(false);
  const navigate = useNavigate();
  const apiurl = isTeacher
    ? 'https://quiz-app.eroslabs.live/api/user/teacher/login'
    : 'https://quiz-app.eroslabs.live/api/user/student/login';



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
          alert('Please fill all the fields before logging in.');
          return;
        }
        const res = await fetch(apiurl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
      
          const fetchUserInfo = async () => {
            try {
              const userInfoRes = await fetch('https://quiz-app.eroslabs.live/api/user/info', {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${data.token}`, // Use the latest token here
                },
              });
              const userData = await userInfoRes.json();
              console.log(userData);
              if (userData.role) {
                localStorage.setItem('userRole', userData.role);
                setIsTeacherLocal(userData.role === 'teacher');
                setIsTeacher(userData.role === 'teacher');
              }
            } catch (error) {
              console.error('Error fetching user info:', error);
            }
          };
      
          fetchUserInfo(); // Call the fetchUserInfo function
          alert('Login successful!');
          navigate('/');
        } else {
          alert('Login failed');
        }
      };
      
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="Login">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <label>
          <input type="checkbox" checked={isTeacher} onChange={() => setIsTeacherLocal(!isTeacher)} />
          Login as Teacher
        </label>
        <button type="submit">Log In</button>
        <p>
          Don't have an account? <Link to="/Signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LogIn;
