import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login setIsTeacher={setIsTeacher} />} />
        <Route path="/class/Add" element={<Class />} />
        <Route path="/classes" element={<ListofClasses />} />
        <Route path="/classes/:classId/students" element={<ListofStudentsinClass />} />
        <Route path="/class/Join" element={<JoinClass />} />
        <Route path="/Quiz/Add" element={<AddQuiz />} />
        <Route path="/Quiz/Add/:classId" element={<Quiz />} />
        <Route path="/Quizez" element={<ListofClasses />} />
      </Routes>
      {location.pathname !== '/Signup' && location.pathname !== '/Login' && <Navbar isTeacher={isTeacher} />}
    </>
  );
}

export default App
