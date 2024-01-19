import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../Styles/App.css"

function ListStudentsinQuiz() {
    const navigate = useNavigate();
    let { quizId, classId } = useParams();
    const [quizResults, setQuizResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {

            const res = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}/results`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const data = await res.json();

            if (res.ok) {
                setQuizResults(data.results);
                setLoading(false);
            } else {
                alert(data.message);
                navigate(`/Quiz/${classId}`);
            }

        };

     
            if (!localStorage.getItem('token')) {
              navigate('/Login');
            }
        fetchStudents();
    }, []);

    const downloadCSV = async () => {
        const res = await fetch(`https://quiz-app.eroslabs.live/api/classes/${classId}/quizzes/${quizId}/csvresults`, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/csv',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const blob = await res.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quiz_results.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };


    return (
        <div className="content">
            <h2>Quiz Results</h2>
            <button onClick={downloadCSV} id="download">Download CSV</button>
            <table className="class-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Quiz</th>
                        <th>Score</th>
                        <th>Submitted At</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4">Loading...</td>
                        </tr>
                    ) : quizResults.length > 0 ? (
                        quizResults.map((result) => (
                            <tr key={result._id}>
                                <td>{result.student_id.full_name}</td>
                                <td>{result.quiz_id.quiz_name}</td>
                                <td>{result.score}</td>
                                <td>{result.submitted_at}</td>
                                
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No Students found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListStudentsinQuiz;
