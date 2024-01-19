import React, { useEffect, useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import "../Styles/App.css"
import {CloseCircleOutlined} from '@ant-design/icons';
function ListofClasses() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [role,setrole]=useState(localStorage.getItem('userRole'));

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
  const deleteClass = async (classId) => {
    try {
      
      const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json();
        window.alert('Class deleted successfully');
        fetchClasses();
      } else {
        const errorData = await response.json();
        console.error('Failed to delete class:', errorData);
        window.alert('Failed to delete class');
      }
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
      {role === "teacher" &&
      <label htmlFor="" id="notice">* Click on Class to display all students in that class</label>}
      <table className="class-table">
        <thead>
          <tr>
            <th>Class Id</th>
            <th>Class</th>
            {role === "teacher" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(classes) ? (
            classes.map((classInfo) => (
              <tr key={classInfo.classObject._id}>
                <td><p>{classInfo.classObject._id}</p></td>
                {role === "teacher" ? <td><Link to={`/Classes/${classInfo.classObject._id}/students`}>{classInfo.classObject.class_name}</Link></td> : <td>{classInfo.classObject.class_name}</td>}
                {role === "teacher" && <td><button onClick={() => deleteClass(classInfo.classObject._id)} id="deletebtn">Delete</button></td>}
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
