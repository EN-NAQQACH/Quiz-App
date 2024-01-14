import React, { useEffect, useState } from 'react';
import '../Styles/Login.css';
import { Link, useNavigate} from 'react-router-dom';

function LogIn() {
    const [token, settoken] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [isTeacher, setisteacher] = useState(false);
    const navigate = useNavigate();
    const apiurl = isTeacher ? "https://quiz-app.eroslabs.live/api/user/teacher/login" : "https://quiz-app.eroslabs.live/api/user/student/login";

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
            body: JSON.stringify({ username, password })
        })
        const data = await res.json();
        if(data.token){
            settoken(data.token);
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            navigate('/');
        }else{
            alert('Login failed');
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/')
        }
    },[])

    return (
        <div className='Login'>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder='Username' />
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='password' />
                <label>
                    <input
                        type='checkbox'
                        checked={isTeacher}
                        onChange={() => setisteacher(!isTeacher)}
                    />
                    Login as Teacher
                </label>
                <button type="submit">Log In</button>
                <p>you don't have an account ? <Link to="/Signup">Sign Up</Link></p>
            </form>
        </div>
    )
}
export default LogIn;