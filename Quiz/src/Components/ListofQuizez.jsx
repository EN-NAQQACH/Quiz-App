import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import "../Styles/App.css"

function ListofQuizez({ isTeacher }) {
  let { classId } = useParams();
  const navigate= useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [expandedQuizId, setExpandedQuizId] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchClasses = async () => {
    const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    console.log(data);
    setQuizzes(data.quizzes); setLoading(false);

  }

  const deleteQuiz = async (quizId) => {
    try {

      const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json()
      if (response.ok) {
        alert(data.message);

      } else {
        console.error("Failed to delete quiz");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };
  
  


  useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/Login');
      }
    fetchClasses();
  }, [isTeacher])

  const toggleQuizDetails = (quizId) => {
    setExpandedQuizId((prevExpandedQuizId) =>
      prevExpandedQuizId === quizId ? null : quizId
    );
  };

  return (
    <div className="quizzes-container">
      <h1>Quizzes</h1>
      <ul className="quizzes-list">
        {loading ? (
          <p>Loading...</p>
        ) :
          quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <li key={quiz.quiz_id} className={`quiz-item ${expandedQuizId === quiz.quiz_id ? 'expanded' : ''}`}>
                <div className="quiz-title" onClick={() => toggleQuizDetails(quiz.quiz_id)}>
                  {quiz.quiz_name}
                </div>
                {expandedQuizId === quiz.quiz_id && (
                  <div className="quiz-details">
                    <p><span>Quiz ID : </span> {quiz.quiz_id}</p>
                    <p><span>Start Date : </span>{quiz.start_date+" GMT"}</p>
                    <p><span>Duration : </span>{quiz.duration} minutes</p>
                    {isTeacher && (
                      <div id="actionsquiz">
                      <Link to={`/Quiz/${classId}/update/${quiz.quiz_id}`} id="update">Update</Link>
                      <Link to={`/Quiz/${classId}/ListStudents/${quiz.quiz_id}`} id="liststudent">Liste of students</Link>
                      <div>
                      <button onClick={() => deleteQuiz(quiz.quiz_id)}id="deletebtnn">Delete</button>
                      </div>
                      </div>
                    )}
                    {!isTeacher && (
                      <Link to={`/Quiz/${classId}/start/${quiz.quiz_id}` }>Start Quiz</Link>
                    )}
                  </div>
                )}
              </li>
            ))) : <p>No quizzes found</p>}
      </ul>
    </div>
  );
}

export default ListofQuizez;
