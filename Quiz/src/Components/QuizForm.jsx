// QuizForm.js
import React, { useState, useEffect } from 'react';
import '../Styles/Nav.css';
import { useParams, useNavigate,Link } from 'react-router-dom';

const QuizForm = ({ quiz }) => {
  let { classId, quizId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [studentId, setUserId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    setUserResponses((prevResponses) => [
      ...prevResponses,
      {
        questionIndex: currentQuestionIndex,
        selectedOptionIndex: optionIndex,
      },
    ]);
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setSubmitting(true);

      const responseData = {
        student_id: studentId,
        responses: userResponses.map((response) => {
          const { questionIndex, selectedOptionIndex } = response;
          const question = quiz.questions[questionIndex];
          const selectedOption = question.options[selectedOptionIndex];
          return {
            question_id: question._id,
            selected_options: [selectedOption._id],
          };
        }),
      };

      console.log('Sending data to server:', responseData);

      try {
        const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}/responses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(responseData),
        });

        // Handle the response from the server (if needed)
        const result = await response.json();
        console.log('Response from server:', result);

        // Navigate to the result page
      } catch (error) {
        console.error('Error submitting quiz responses:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const fetchUser = async () => {
    const res = await fetch('https://quiz-app.eroslabs.live/api/user/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const data = await res.json();
    setUserId(data.id);
  };

  useEffect(() => {

      if (!localStorage.getItem('token')) {
        navigate('/Login');
      }
    fetchUser();
  }, []);

  return (
    <div className="Quiz-Form">
      <input type="text" value={studentId} disabled="true" />
      <input type="text" value={quiz.quiz_name} disabled="true" />
      <div className="question-content">
        <p>Question {currentQuestionIndex + 1}:</p>
        <p>{currentQuestion.question_text}</p>
      </div>

      {currentQuestion.options.map((option, optionIndex) => (
        <div key={optionIndex} className="option-content">
          <label>
            <input
              type="checkbox"
              name={`question_${currentQuestionIndex}`}
              checked={userResponses.some(
                (response) =>
                  response.questionIndex === currentQuestionIndex &&
                  response.selectedOptionIndex === optionIndex
              )}
              onChange={() => handleOptionSelect(optionIndex)}
            />
            {option.option_text}
          </label>
        </div>
      ))}

      {currentQuestionIndex < quiz.questions.length - 1 && (
        <div className="nxtbtn">
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}

      {currentQuestionIndex === quiz.questions.length - 1 && !submitting && (
        <div className="nxtbtn">
          <button onClick={handleNextQuestion}><Link to={`/Quiz/${classId}/result/${quizId}/student/${studentId}`}>result</Link></button>
        </div>
      )}

      {submitting && <p>Submitting...</p>}
    </div>
  );
};

export default QuizForm;


// // QuizForm.js
// import React, { useState, useEffect } from 'react';
// import '../Styles/Nav.css';
// import { useParams ,Link, useNavigate} from 'react-router-dom';

// const QuizForm = ({ quiz }) => {
//   let { classId, quizId } = useParams();
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userResponses, setUserResponses] = useState([]);
//   const [userId, setuserId] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   const handleOptionSelect = (optionIndex) => {
//     setUserResponses((prevResponses) => [
//       ...prevResponses,
//       {
//         questionIndex: currentQuestionIndex,
//         selectedOptionIndex: optionIndex,
//       },
//     ]);
//   };

//   const handleNextQuestion = async () => {
//     if (currentQuestionIndex < quiz.questions.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     } else {
//       setSubmitting(true);

//       const responseData = {
//         student_id: userId,
//         responses: userResponses.map((response) => {
//           const { questionIndex, selectedOptionIndex } = response;
//           const question = quiz.questions[questionIndex];
//           const selectedOption = question.options[selectedOptionIndex];
//           return {
//             question_id: question._id,
//             selected_options: [selectedOption._id],
//           };
//         }),
//       };

//       console.log('Sending data to server:', responseData);

//       try {
//         const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}/responses`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//           body: JSON.stringify(responseData),
//         });

//         // Handle the response from the server (if needed)
//         const result = await response.json();
//         const navigate = useNavigate()
//         navigate(`/Result/Quiz/${classId}/${quizId}/${userId}`)
//         console.log('Response from server:', result);
//       } catch (error) {
//         console.error('Error submitting quiz responses:', error);
//       } finally {
//         setSubmitting(false);
//       }
//     }
//   };

//   const currentQuestion = quiz.questions[currentQuestionIndex];

//   const fetchuser = async () => {
//     const res = await fetch('https://quiz-app.eroslabs.live/api/user/info', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token'),
//       },
//     });
//     const data = await res.json();
//     setuserId(data.id);
//   };

//   useEffect(() => {
//     fetchuser();
//   }, []);

//   return (
//     <div className="Quiz-Form">
//       <input type="text" value={userId} disabled="true" />
//       <input type="text" value={quiz.quiz_name} disabled="true" />
//       <div className="question-content">
//         <p>Question {currentQuestionIndex + 1}:</p>
//         <p>{currentQuestion.question_text}</p>
//       </div>

//       {currentQuestion.options.map((option, optionIndex) => (
//         <div key={optionIndex} className="option-content">
//           <label>
//             <input
//               type="checkbox"
//               name={`question_${currentQuestionIndex}`}
//               checked={userResponses.some(
//                 (response) =>
//                   response.questionIndex === currentQuestionIndex &&
//                   response.selectedOptionIndex === optionIndex
//               )}
//               onChange={() => handleOptionSelect(optionIndex)}
//             />
//             {option.option_text}
//           </label>
//         </div>
//       ))}
      
//       {currentQuestionIndex < quiz.questions.length - 1 && (
//         <div className="nxtbtn">
//           <button onClick={handleNextQuestion}>Next Question</button>
//         </div>
//       )}
      
//       {currentQuestionIndex === quiz.questions.length - 1 && !submitting && (
//         <div className="nxtbtn">
//           <button onClick={handleNextQuestion}><Link to={`/Result/Quiz/${classId}/${quizId}/${userId}`}>hi</Link></button>
//         </div>
//       )}

//       {submitting && <p>Submitting...</p>}
//     </div>
//   );
// };

// export default QuizForm;



































/*
// QuizForm.js
import React, { useState,useEffect} from 'react';
import '../Styles/Nav.css';
import { useParams } from 'react-router-dom';

const QuizForm = ({ quiz }) => {
  let {classId, quizId} = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [userId, setuserId] = useState('')

  const handleOptionSelect = (optionIndex) => {
    setUserResponses((prevResponses) => [
      ...prevResponses,
      {
        questionIndex: currentQuestionIndex,
        selectedOptionIndex: optionIndex,
      },
    ]);
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      const responseData = {
        student_id: userId,
        responses: userResponses.map((response) => {
          const { questionIndex, selectedOptionIndex } = response;
          const question = quiz.questions[questionIndex];
          const selectedOption = question.options[selectedOptionIndex];
          return {
            question_id: question._id,
            selected_options: [selectedOption._id],
          };
        }),
      };
  
      console.log('Sending data to server:', responseData); // Log the data being sent to the server
  
      try {
        const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}/responses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(responseData),
        });
  
        // Handle the response from the server (if needed)
        const result = await response.json();
        console.log('Response from server:', result);
      } catch (error) {
        console.error('Error submitting quiz responses:', error);
      }
    }
  };
  
  
  

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const fetchuser = async () => {
    const res = await fetch('https://quiz-app.eroslabs.live/api/user/info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    })
    const data = await res.json()
    setuserId(data.id)
}
useEffect(() => {
  fetchuser();
}, [])



  return (
    <div className="Quiz-Form">
      <input type="text" value={userId} disabled="true"/>
      <input type="text" value={quiz.quiz_name} disabled="true" />
      <div className="question-content">
      <p>Question {currentQuestionIndex + 1}:</p>
      <p>{currentQuestion.question_text}</p>
      </div>

      {currentQuestion.options.map((option, optionIndex) => (
        <div key={optionIndex} className="option-content">
          <label>
            <input
              type="checkbox"
              name={`question_${currentQuestionIndex}`}
              checked={userResponses.some(
                (response) =>
                  response.questionIndex === currentQuestionIndex &&
                  response.selectedOptionIndex === optionIndex
              )}
              onChange={() => handleOptionSelect(optionIndex)}
            />
            {option.option_text}
          </label>
        </div>
      ))}
      <div className="nxtbtn">
      <button onClick={handleNextQuestion}>Next Question</button>
      </div>
    </div>
  );
};

export default QuizForm;
*/