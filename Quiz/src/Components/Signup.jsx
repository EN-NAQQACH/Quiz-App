import { useState } from 'react';
import React from 'react';
import '../Styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [isStudent, setStudent] = useState(false);
    const [isTeacher, setTeacher] = useState(false);
    const [username, setusername] = useState('');
    const [full_name, setfullname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedRole = isStudent ? 'student' : isTeacher ? 'teacher' : null;
        if (username === '' || full_name === '' || email === '' || password === '' || !selectedRole) {
            alert('Please fill all the fields before signing up or select a role.');
            return;
        }

        const apiurl = selectedRole === 'student' ? "https://quiz-app.eroslabs.live/api/user/student/signup" : selectedRole === 'teacher' ? 'https://quiz-app.eroslabs.live/api/user/teacher/signup' : null;
        if (!apiurl) {
            alert('Invalid role selected.');
            return;
        }

        const res = await fetch(apiurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, full_name, email, password })
        })
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            alert('Signup successful!');
            navigate('/Login');
        } else {
            alert('Signup failed. Please try again.');
        }

    }
    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'student') {
            setStudent(checked);
            if (checked) {
                setTeacher(false);
            }
        } else if (name === 'teacher') {
            setTeacher(checked);
            if (checked) {
                setStudent(false);
            }
        }
    }
    return (
        <div className='Signup'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder='Username' />
                <input type="text" value={full_name} onChange={(e) => setfullname(e.target.value)} placeholder='fullname' />
                <input type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='email@gmail.com' />
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='password' />
                <label htmlFor="">
                    <label className='Student'>
                        <input type="checkbox" name="student" checked={isStudent} onChange={handleChange} />
                        Student
                    </label>
                    <label className='Teacher'>
                        <input type="checkbox" name="teacher" checked={isTeacher} onChange={handleChange} />
                        Teacher
                    </label>
                </label>
                <button type="submit">Sign up</button>
                <p>you have already an account ? <Link to="/Login">Log In</Link></p>
            </form>
        </div>
    )
}
export default Signup;