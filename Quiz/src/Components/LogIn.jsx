import React, { useEffect, useState } from 'react';
import '../Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';

function LogIn({ setIsTeacher }) {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [isTeacher, setIsTeacherLocal] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');


  const handleFocus = (e) => {
    e.target.parentNode.classList.add('focused');
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      e.target.parentNode.classList.remove('focused');
    }
  };
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
      
          fetchUserInfo(); 
          alert('Login successful!');
          window.location.href = '/';
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
    // <div>
    // <div className="Login">
    //   <h2>Log In</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    //     <label>
    //       <input type="checkbox" checked={isTeacher} onChange={() => setIsTeacherLocal(!isTeacher)} />
    //       Login as Teacher
    //     </label>
    //     <button type="submit">Log In</button>
    //     <p>
    //       Don't have an account? <Link to="/Signup">Sign Up</Link>
    //     </p>
    //   </form>
    // </div>
    // </div>
<div className="login-signup">
<header>
      <div>Quiz</div>
      <div className="btn-login-signup">
        <Link to="/Login"><button>Login</button></Link>
        <Link to="/Signup"><button>Sign up</button></Link>
      </div>
      </header>
    <div className="google-login-container">
      
      <h1>Welcome</h1>
      <form className="google-login-form" onSubmit={handleSubmit}>
        <fieldset className="google-login-fieldset">
          <legend className="fieldset-legend">Account Login</legend>

          <div className="google-login-field">
            <label htmlFor="username" className="placeholder">username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {setUsername(e.target.value)}}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              
            />
          </div>

          <div className="google-login-field">
            
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              
              
            />
          </div>
          <div className="google-login-checkbox">
            <input
              type="checkbox"
              checked={isTeacher} onChange={() => setIsTeacherLocal(!isTeacher)}
            />
            <label htmlFor="">Teacher</label>
          </div>
          <button type="submit" id="signup">Sign in</button>
        </fieldset>
      </form>
      <p className="google-forgot-password">Don't have an account <Link to="/Signup">Sign up</Link></p>
    </div>
    </div>
  );
}

export default LogIn;
