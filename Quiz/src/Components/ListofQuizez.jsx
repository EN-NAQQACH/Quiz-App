import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/App.css"

function ListofQuizez() {
    let {classId} = useParams();

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
    setQuizzes(data.quizzes);setLoading(false);

  }
  useEffect(() => {
    fetchClasses();
  }, [])

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
        quizzes.length > 0  ? (
        quizzes.map((quiz) => (
          <li key={quiz.quiz_id} className={`quiz-item ${expandedQuizId === quiz.quiz_id ? 'expanded' : ''}`}>
            <div className="quiz-title" onClick={() => toggleQuizDetails(quiz.quiz_id)}>
              {quiz.quiz_name}
            </div>
            {expandedQuizId === quiz.quiz_id && (
              <div className="quiz-details">
                <p><span>Quiz ID : </span> {quiz.quiz_id}</p>
                <p><span>Start Date : </span>{quiz.start_date}</p>
                <p><span>Duration : </span>{quiz.duration} minutes</p>
                <Link to={`/Quiz/${classId}/update/${quiz.quiz_id}`}>Update</Link>
              </div>
            )}
          </li>
        ))): <p>No quizzes found</p>}
      </ul>
    </div>
  );
}

export default ListofQuizez;
