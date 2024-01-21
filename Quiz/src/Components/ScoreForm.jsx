// QuizPage.js
import React, { useState, useEffect,  } from 'react';
import { useParams ,useNavigate,Link} from 'react-router-dom';
import '../Styles/App.css';

const ScoreForm = () => {
  const { classId, quizId, studentId} = useParams();
  console.log("class id " + classId + "quizid " + quizId + "studentid"+studentId)
  const [score , setscore] = useState();
  const [totalquestion, settotalquestion] = useState('');

  useEffect(() => {
    const fetchScoreFromQuiz = async () => {
      try {
        const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}/results/${studentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        const data = await response.json();
        setscore(data.score);
        settotalquestion(data.out_of);
      } catch (error) {
        console.log(error)
      }
    };
      if (!localStorage.getItem('token')) {
        navigate('/');
      }

    fetchScoreFromQuiz();
  }, []);

  return (
    <div id="content">

    
    <div className="result-page">
      <div className="info-score">
            <div className="title">
                <h2>Your Final Score is</h2>
                <div>
                <p>{score}</p>
                </div>
            </div>
            <div className="details-score">
                <div>
                <p>each correct answer</p>
                <p>Total Question</p>
                </div>
                <div>
                <p>1 point</p>
                <p>{totalquestion}</p>
                </div>
            </div>
            <div className="btn-back">
               <Link to={`/Quiz/${classId}`}><button>Back to Quizes</button></Link> 
            </div>
      </div>
      
    </div>
    </div>
  );
};

export default ScoreForm;
