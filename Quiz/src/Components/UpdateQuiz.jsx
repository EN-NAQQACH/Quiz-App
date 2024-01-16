import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../Styles/Quiz.css';

const UpdateQuiz = () => {
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
  return (
    <div className="content">
      <h2>Edit Quiz</h2>
      <form className="formquiz" >
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
            value={quizData.start_date}
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
                    required
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

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateQuiz;
