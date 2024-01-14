import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../App.css";

function ListofStudentsinClass() {

    let { classId } = useParams();
    const [students, setStudents] = useState([]);
    useEffect(() => {
        fetchStudents();
    }, [])
    const fetchStudents = async () => {
        const res = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/students`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await res.json();
        console.log(data);
        const StudentsArray = data.hasOwnProperty('students') ? data.students : [];
        setStudents(StudentsArray);
    }
    return (
        <div>
            <h2>Students Information</h2>
            {students.map(student => (
                <div key={student.id} className="Students-info">
                    <p>ID: {student.id}</p>
                    <p>Name: {student.name}</p>
                    <p>Email: {student.email}</p>
                    <p>Username: {student.username}</p>
                </div>
            ))}
        </div>
    );
}

export default ListofStudentsinClass;
