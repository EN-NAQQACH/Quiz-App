// QuizPage.js
import React, { useState, useEffect,  } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import QuizForm from './QuizForm';
import '../Styles/App.css';

const QuizPage = () => {
  const { classId, quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
    const navigate = useNavigate();
    const fetchQuiz = async () => {
        const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        const data = await response.json();
        if(response.ok){
        
          setQuiz(data.quiz);
        }else{
          alert(data.error)
          navigate(`/Quiz/${classId}`)
        }
    };

  useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/');
      }
    fetchQuiz();
  }, []);
  return (
    <div id="content">
    <div className="Quiz-Page">
      {quiz ? (
        <QuizForm quiz={quiz} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default QuizPage;
