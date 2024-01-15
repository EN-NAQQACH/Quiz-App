import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import '../Styles/Quiz.css';

const NewQuizForm = () => {
  let{classId} = useParams();
  console.log(classId);
  const [quiz_name, setquiz_name] = useState('');
  const [duration, setDuration] = useState('');
  const [start_date, setstart_date] = useState('');
  const [questions, setQuestions] = useState([{ question_text: '', options: [{ option_text: '', is_correct: false }] , is_multiple_choice: false }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question_text: '', options: [{ option_text: '', is_correct: false }] , is_multiple_choice: false  }]);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ option_text: '', is_correct: false });
    setQuestions(newQuestions);
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          quiz_name,
          classId,
          duration,
          start_date,
          questions,
        }),
      });
  
      if (response.ok) {
        console.log('Quiz successfully created!');
      } else{
        const errorMessage = await response.text();
        console.error(`Failed to create quiz. Server returned: ${response.status} - ${errorMessage}`);
      }
    } catch (error) {
      console.error('An error occurred during quiz creation:', error);
    }
  };

  return (
    <div className="Quiz-Content">
      <h2>Create a New Quiz</h2>
      <form className="formquiz" onSubmit={handleSubmitQuiz}>
        <label>
          Quiz Name:
          <input placeholder="Math / react " type="text" value={quiz_name} onChange={(e) => setquiz_name(e.target.value)} required="true" />
        </label>
        <br />
        <label>
          Duration (in minutes):
          <input placeholder="5 minutes" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required="true" />
        </label>
        <br />
        <label>
          Start Date:
          <input type="datetime-local" value={start_date} onChange={(e) => setstart_date(e.target.value)} required="true" />
        </label>
        <br />

        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <label>
              Question {questionIndex + 1}:
              <input
                type="text"
                required="true" 
                placeholder="what is react ?"
                value={question.question_text}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[questionIndex].question_text = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
            </label>
            <br />

            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  Option {optionIndex + 1}:
                  <input
                    type="text"
                    required="true" 
                    placeholder="Library for ui"
                    value={option.option_text}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[questionIndex].options[optionIndex].option_text = e.target.value;
                      setQuestions(newQuestions);
                    }}
                  />
                </label>
                <label className="correct">
                  is Correct ?
                  <input
                    type="checkbox"
                    required="true" 
                    checked={option.is_correct}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[questionIndex].options[optionIndex].is_correct = e.target.checked;
                      setQuestions(newQuestions);
                    }}
                  />
                </label>
                <br />
              </div>
            ))}

            <button type="button" onClick={() => handleAddOption(questionIndex)} className="btn-option">
              Add Option
            </button>
            <br />
          </div>
        ))}
        <div className="buttons">
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
          <button type="submit">
            Add Quiz
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewQuizForm;
