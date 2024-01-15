import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/App.css"
function AddQuiz() {
  const [classes, setClasses] = useState([]);
  const fetchClasses = async () => {
    const response = await fetch("https://quiz-app.eroslabs.live/api/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    console.log(data);
    const classesArray = data.hasOwnProperty('classes') ? data.classes : [];
    setClasses(classesArray);

  }


  useEffect(() => {
    fetchClasses();
  }, [])

  return (
    <div className="Content-Class">
      <h2>List of Classes</h2>
      <table className="class-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(classes) ? (
            classes.map((classInfo) => (
              <tr key={classInfo._id}>
                <td ><Link to={`/classes/${classInfo._id}/students`}>{classInfo.class_name}</Link></td>
                <td><div id="actions"><Link to={`/classes/${classInfo._id}/students`}><button>Add Quiz</button></Link><Link to={`/classes/${classInfo._id}/students`}><button>Update</button></Link></div></td>
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

export default AddQuiz