import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import "../Styles/App.css"
import student from "../assets/book.png"

const Navbar = ({ isTeacher }) => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [isSubMenuOpen2, setSubMenuOpen2] = useState(false);
  const [isSubMenuOpen3, setSubMenuOpen3] = useState(false);
  const handleSubMenuToggle = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };
  const handleSubMenuToggle2 = () => {
    setSubMenuOpen2(!isSubMenuOpen2);
  };
  const handleSubMenuToggle3 = () => {
    setSubMenuOpen3(!isSubMenuOpen3);
  };
  const [username, setusername] = useState('');
  const [role, setrole] = useState('');

  const fetchUserInfo = async () => {
    try {
      const userInfoRes = await fetch('https://quiz-app.eroslabs.live/api/user/info', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Use the latest token here
        },
      });
      const userData = await userInfoRes.json();
      setusername(userData.username);
      setrole(userData.role);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // if the user is not a teacher hide the quiz
  const [showQuiz, setShowQuiz] = useState(true);
  useEffect(() => {
    fetchUserInfo();
    setShowQuiz(isTeacher);
  }, [isTeacher]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/Login');
  };


  return (
    <div>
      <div>
        <div className="sidebar">
          <div className="logo">
            <h2>logo</h2>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/"><img src={student} alt="" /><span>home</span>
              </Link>
            </li>
            <li>
              <Link to="#" onClick={handleSubMenuToggle}><img src={student} alt="" /><span>Class</span><i className='bx bx-chevron-down'></i></Link>
              <ul className={`sub-menu ${isSubMenuOpen ? 'open' : ''}`}>
                {showQuiz && (
                  <li>
                    <Link to="/class/Add">
                      <img src={student} alt="" />
                      <span>Add Class</span>
                    </Link>
                  </li>
                )}
                {!showQuiz && (
                <li>
                  <Link to="/class/Join">
                    <img src={student} alt="" />
                    <span>Join Class</span>
                  </Link>
                </li>
                 )}
                <li>
                  <Link to="/classes">
                    <img src={student} alt="" />
                    <span>List of Classes</span>
                  </Link>
                </li>
              </ul>
            </li>
            {/* {showQuiz && (
              <li>
                <Link to="/" onClick={handleSubMenuToggle2}><img src={student} alt="" /><span>Student</span><i className='bx bx-chevron-down'></i></Link>
                <ul className={`sub-menu ${isSubMenuOpen2 ? 'open' : ''}`}>
                  <li>
                    <Link to="/">
                      <img src={student} alt="" />
                      <span>Add Student</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <img src={student} alt="" />
                      <span>List of Students</span>
                    </Link>
                  </li>
                </ul>
              </li>
            )} */}
            <li>
              <Link to="#" onClick={handleSubMenuToggle3}><img src={student} alt="" /><span>Quiz</span><i className='bx bx-chevron-down'></i></Link>
              <ul className={`sub-menu ${isSubMenuOpen3 ? 'open' : ''}`}>
                {showQuiz && (
                  <li>
                    <Link to="/Quiz/Add">
                      <img src={student} alt="" />
                      <span>Add Quiz</span>
                    </Link>
                  </li>
                )}
                <li>
                <Link to="/Quizez">
                    <img src={student} alt="" />
                    <span>List of Quizez</span>
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
          <div className="profile">
            <div className="profile-content">
              <img src={student} alt="" />
            </div>
            <li>
              <div className="info-profile">
                <p>{username}</p>
                <p>{role}</p>
              </div>
              <i className='bx bx-log-out' onClick={handleLogout}></i>
            </li>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Navbar;
