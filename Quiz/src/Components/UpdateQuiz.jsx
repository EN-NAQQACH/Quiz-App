import { useParams, useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../Styles/Quiz.css';

const UpdateQuiz = () => {
    const navigate = useNavigate();
    const { classId, quizId } = useParams();
    const [quizData, setQuizData] = useState({
      quiz_name: '',
      class_id: '',
      start_date: '',
      duration: 0,
      questions: [],
    });
  
    const fetchData = async () => {
      try {
        const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        const data = await response.json();
        setQuizData(data.quiz);
        console.log(data.quiz);
      } catch (error) {
        console.error('An error occurred during quiz creation:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [classId, quizId]);
  
    const handleAddQuestion = () => {
      setQuizData((prevData) => ({
        ...prevData,
        questions: [...prevData.questions, { question_text: '', options: [{ option_text: '', is_correct: false }] }],
      }));
    };
  
    const handleAddOption = (questionIndex) => {
      setQuizData((prevData) => {
        const newQuestions = prevData.questions.map((question, index) => {
          if (index === questionIndex) {
            return {
              ...question,
              options: [...question.options, { option_text: '', is_correct: false }],
            };
          }
          return question;
        });
  
        return {
          ...prevData,
          questions: newQuestions,
        };
      });
    };
    // function to handle ddate time
    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // Convert to local time
        const year = localDate.getFullYear();
        const month = `0${localDate.getMonth() + 1}`.slice(-2);
        const day = `0${localDate.getDate()}`.slice(-2);
        const hours = `0${localDate.getHours()}`.slice(-2);
        const minutes = `0${localDate.getMinutes()}`.slice(-2);
    
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(quizData),
          });
    
          if (response.ok) {
            alert('Quiz updated successfully!');
            navigate(`/Quiz/${classId}`);
          } else {
            const errorMessage = await response.text();
            console.error(`Failed to update quiz. Server returned: ${response.status} - ${errorMessage}`);
          }
        } catch (error) {
          console.error('An error occurred during quiz update:', error);
        }
      };
  
  return (
    <div className="content">
      <h2>Edit Quiz</h2>
      <form className="formquiz" onSubmit={handleSubmit}>
        <label>
          Quiz Name:
          <input
            type="text"
            value={quizData.quiz_name}
            onChange={(e) => setQuizData({ ...quizData, quiz_name: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="datetime-local"
            value={formatDateForInput(quizData.start_date)}
            onChange={(e) => setQuizData({ ...quizData, start_date: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Duration (in minutes):
          <input
            type="number"
            value={quizData.duration}
            onChange={(e) => setQuizData({ ...quizData, duration: e.target.value })}
            required
          />
        </label>
        <br />

        {quizData.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <label>
              Question {questionIndex + 1}:
              <input
                type="text"
                value={question.question_text}
                onChange={(e) => {
                  const newQuestions = [...quizData.questions];
                  newQuestions[questionIndex].question_text = e.target.value;
                  setQuizData({ ...quizData, questions: newQuestions });
                }}
                required
              />
            </label>
            <br />

            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  Option {optionIndex + 1}:
                  <input
                    type="text"
                    value={option.option_text}
                    onChange={(e) => {
                      const newQuestions = [...quizData.questions];
                      newQuestions[questionIndex].options[optionIndex].option_text = e.target.value;
                      setQuizData({ ...quizData, questions: newQuestions });
                    }}
                    required
                  />
                </label>
                <label className="correct">
                  is Correct ?
                  <input
                    type="checkbox"
                    checked={option.is_correct}
                    onChange={(e) => {
                      const newQuestions = [...quizData.questions];
                      newQuestions[questionIndex].options[optionIndex].is_correct = e.target.checked;
                      setQuizData({ ...quizData, questions: newQuestions });
                    }}
                    
                  />
                </label>
                <br />
              </div>
            ))}

            <button type="button" onClick={() => handleAddOption(questionIndex)}>
              Add Option
            </button>
            <br />
          </div>
        ))}
    <div className="buttons">
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateQuiz;
