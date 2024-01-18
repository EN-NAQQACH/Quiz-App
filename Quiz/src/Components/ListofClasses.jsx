import React, { useEffect, useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import "../Styles/App.css"
function ListofClasses() {
  const navigate = useNavigate();
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

  const deleteClass = async (classId) => {
    try {
      const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json();
      console.log(data)
    }catch(e){
      console.log(e)
    };
  }


  useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/Login');
      }
    fetchClasses();
  }, [])

  return (
    <div className="content">
      <h2>List of Classes</h2>
      <label htmlFor="" id="notice">* Click on Class to display all students in that class</label>
      <table className="class-table">
        <thead>
          <tr>
            <th>Class Id</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(classes) ? (
            classes.map((classInfo) => (
              <tr key={classInfo.classObject._id}>
                <td><p>{classInfo.classObject._id}</p></td>
                <td><Link to={`/Classes/${classInfo.classObject._id}/students`}>{classInfo.classObject.class_name}</Link></td>
                <td><button onClick={() => deleteClass(classInfo.classObject._id)}>Delete</button></td>
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

export default ListofClasses;
