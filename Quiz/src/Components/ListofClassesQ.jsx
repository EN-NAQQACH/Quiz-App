import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "../Styles/App.css"

function ListofClassesQ() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const fetchClasses = async () => {
    const response = await fetch("https://quiz-app.eroslabs.live/api/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    const classesArray = data.hasOwnProperty('classes') ? data.classes : [];
    setClasses(classesArray);

  }
  useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/');
      }
    fetchClasses();
  }, [])

  return (
    <div id="content">
      <h2>List of Classes</h2>
      <label htmlFor="">* Click on Quiz to display all Quizez in that class</label>
      <table className="class-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(classes) ? (
            classes.map((classInfo) => (
              <tr key={classInfo.classObject._id}>
                {/* <td><p>{classInfo.classObject._id}</p></td> */}
                <td>{classInfo.classObject.class_name}</td>
                <td><Link to={`/Quiz/${classInfo.classObject._id}`}>Quiz...</Link></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No classes found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListofClassesQ;
