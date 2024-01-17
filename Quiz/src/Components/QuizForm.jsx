// QuizForm.js
import React, { useState } from 'react';
import '../Styles/App.css';

const QuizForm = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);

  const handleOptionSelect = (optionIndex) => {
    setUserResponses((prevResponses) => [
      ...prevResponses,
      {
        questionIndex: currentQuestionIndex,
        selectedOptionIndex: optionIndex,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Handle quiz completion (e.g., submit responses to the server)
      console.log('Quiz completed. User responses:', userResponses);
    }
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="content">
      <h2>{quiz.quiz_name}</h2>
      <p>Question {currentQuestionIndex + 1}:</p>
      <p>{currentQuestion.question_text}</p>

      {currentQuestion.options.map((option, optionIndex) => (
        <div key={optionIndex}>
          <label>
            <input
              type="radio"
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

      <button onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
};

export default QuizForm;
