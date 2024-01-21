import React, { useEffect, useState } from 'react';
import { Link, useParams,useNavigate} from 'react-router-dom';
import '../Styles/App.css';

function ListofStudentsinClass() {
  let { classId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/');
      }
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
      const StudentsArray = data.hasOwnProperty('students') ? data.students : [];
      setStudents(StudentsArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };


  const deleteStudent = async (studentId) => {
    
    try {
      console.log(studentId)
      const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/remove-student`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({studentId})
      })
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      }
    }catch(e){
      console.log(e)
    };
  }

  return (
    <div id="content">
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
            <th>Actions</th>
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
                <td><button onClick={() => deleteStudent(student.id)}>Delete</button></td>
              </tr>
            ))) : (
            <tr>
              <td colSpan="5">No Students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListofStudentsinClass;
