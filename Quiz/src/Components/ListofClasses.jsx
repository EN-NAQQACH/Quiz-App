import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../App.css"
function ListofClasses() {
    const [classes , setClasses] = useState([]);
    const fetchClasses = async () => {
        const response = await fetch("https://quiz-app.eroslabs.live/api/classes",{
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
    },[])

  return (
    <div className="Content-Class">
      <h2>List of Classes</h2>
      <table className="class-table">
        <thead>
          <tr>
            <th>Class Id</th>
            <th>Class</th> 
          </tr>
        </thead>
        <tbody>
        {Array.isArray(classes) ? (
            classes.map((classInfo) => (
              <tr key={classInfo._id}>
                <td>{classInfo._id}</td>
                <td ><Link to={`/classes/${classInfo._id}/students`}>{classInfo.class_name}</Link></td>
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
