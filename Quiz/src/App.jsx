import { useState, useEffect } from 'react'
import Signup from './Components/Signup';
import Login from './Components/LogIn';
import Home from './Components/HomePage';
import Navbar from './Components/Navbar';
import Class from './Components/AddClass';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ListofClasses from './Components/ListofClasses';
import ListofStudentsinClass from './Components/ListofStudentsinClass';
import JoinClass from './Components/JoinClass';
import AddQuiz from './Components/AddQuiz';
import Quiz from './Components/Quiz';
import UserInfo from './Components/UserInfo';
import ListofClassesQ from './Components/ListofClassesQ';
import ListofQuizez from './Components/ListofQuizez';
import UpdateQuiz from './Components/UpdateQuiz';
import QuizForm from './Components/QuizForm';
import QuizPage from './Components/QuizPage';
import ScoreForm from './Components/ScoreForm';
import ListStudentsinQuiz from './Components/ListStudentsInQuiz';
import Page404 from './Components/Page404';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    // Define routes where Navbar should not be rendered
    const routesWithoutNavbar = ['/Signup', '/Login'];

    // Check if the current route is in the routesWithoutNavbar array
    const shouldRenderNavbar = !routesWithoutNavbar.includes(location.pathname);

    if (shouldRenderNavbar) {
      const userRole = localStorage.getItem('userRole');
      setIsTeacher(userRole === 'teacher');
    }
  }, [location]);

  return (
    <>
      <Routes>
      <Route path="/" element={<Login setIsTeacher={setIsTeacher} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/info" element={<UserInfo />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login setIsTeacher={setIsTeacher} />} />
        <Route path="/Class/Add" element={<Class />} />
        <Route path="/Classes" element={<ListofClasses />} />
        <Route path="/Classes/:classId/students" element={<ListofStudentsinClass />} />
        <Route path="/Class/Join" element={<JoinClass />} />
        <Route path="/Quizez" element={<ListofClassesQ />} />
        {/* Nested Quiz Routes */}
        <Route path="/Quiz">
          <Route path="Add" element={<AddQuiz />} />
          <Route path="Add/:classId" element={<Quiz />} />
          <Route path=":classId" element={<ListofQuizez isTeacher={isTeacher} />} />
          <Route path=":classId/update/:quizId" element={<UpdateQuiz />} />
          <Route path=":classId/start/:quizId" element={<QuizPage />} />
          <Route path=":classId/result/:quizId/student/:studentId" element={<ScoreForm />} />
          <Route path=":classId/ListStudents/:quizId" element={<ListStudentsinQuiz />} />
        </Route>
        {/* <Route path="/Quiz/Add" element={<AddQuiz />} />
        <Route path="/Quiz/Add/:classId" element={<Quiz />} />
        <Route path="/Quizez" element={<ListofClassesQ />} />
        <Route path="/Quiz/:classId" element={<ListofQuizez isTeacher={isTeacher} />} />
        <Route path="/Quiz/:classId/update/:quizId" element={<UpdateQuiz />} />
        <Route path="/Quiz/:classId/start/:quizId" element={<QuizPage />} />
        <Route path="/Quiz/:classId/result/:quizId/student/:studentId" element={<ScoreForm />} />
        <Route path="/Quiz/:classId/ListStudents/:quizId" element={<ListStudentsinQuiz />} /> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
      {location.pathname !== '/Signup' && location.pathname !== '/Login' && location.pathname !== '/' && <Navbar isTeacher={isTeacher} />}
    </>
  );
}

export default App
