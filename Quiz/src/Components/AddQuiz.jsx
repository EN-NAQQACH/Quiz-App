import React, { useEffect, useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import "../Styles/App.css"
function AddQuiz() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchClasses = async () => {
    try {
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
    setLoading(false);
    } catch (error) {
      setLoading(false);
    }


  }


  useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/');
      }
    fetchClasses();
  }, [navigate])

  return (
    <div id="content">
      <h2>List of Classes</h2>
      <table className="class-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      {loading ? (
        <p>Loading...</p>
      ): classes.length > 0 ? (
            classes.map((classInfo) => (
              <tr key={classInfo.classObject._id}>
                <td ><Link to="#">{classInfo.classObject.class_name}</Link></td>
                <td><Link to={`/Quiz/Add/${classInfo.classObject._id}`} id="addbtn"><button>Add Quiz</button></Link></td>
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