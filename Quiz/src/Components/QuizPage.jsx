// QuizPage.js
import React, { useState, useEffect,  } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import QuizForm from './QuizForm';
import '../Styles/App.css';

const QuizPage = () => {
  const { classId, quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
    const navigate = useNavigate();
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        const data = await response.json();
        setQuiz(data.quiz);
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    };

    fetchQuiz();
  }, [classId, quizId]);
  return (
    <div className="Quiz-Page">
      {quiz ? (
        <QuizForm quiz={quiz} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizPage;
