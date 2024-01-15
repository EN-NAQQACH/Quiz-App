import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../Styles/App.css';

function ListofStudentsinClass() {
  let { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/students`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      console.log(data);
      const StudentsArray = data.hasOwnProperty('students') ? data.students : [];
      setStudents(StudentsArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  return (
    <div className="Content-Class">
      <h2>Students Information</h2>
      {/* {loading ? (
        <p>Loading...</p>
      ) : students.length > 0 ? (
        students.map((student, index) => (
          <div key={student.id || index} className="Students-info">
                    <p style={{ fontWeight: 'bold' }}>ID: {student.id}</p>
                    <p>Name: <span style={{ fontStyle: 'italic' }}>{student.name}</span></p>
                    <p>Email: {student.email}</p>
                    <p style={{ color: 'blue' }}>Username: {student.username}</p>
          </div>
        ))
      ) : (
        <p>No students found</p>
      )} */}


      <table className="class-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
      {loading ? (
        <td colSpan="4">Loading...</td>
      ): students.length > 0 ? (
        students.map((student) => (
              <tr key={student.id || index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.username}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No classes found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListofStudentsinClass;
