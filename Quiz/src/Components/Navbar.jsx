import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import "../App.css"
import 'boxicons';
import student from "../assets/book.png"
const Navbar = () => {
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

  // useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     navigate('/Login')
  //   }
  // }, [])

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
              <Link to="#"><img src={student} alt="" /><span>Class</span><i className='bx bx-chevron-down' onClick={handleSubMenuToggle}></i></Link>
              <ul className={`sub-menu ${isSubMenuOpen ? 'open' : ''}`}>
                <li>
                  <Link to="/Class/Add">
                    <img src={student} alt="" />
                    <span>Add Class</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <img src={student} alt="" />
                    <span>List of Classes</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/"><img src={student} alt="" /><span>Student</span><i className='bx bx-chevron-down' onClick={handleSubMenuToggle2}></i></Link>
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
            <li>
              <Link to="/"><img src={student} alt="" /><span>Quiz</span><i className='bx bx-chevron-down' onClick={handleSubMenuToggle3}></i></Link>
              <ul className={`sub-menu ${isSubMenuOpen3 ? 'open' : ''}`}>
                <li>
                  <Link to="/">
                    <img src={student} alt="" />
                    <span>Add Quiz</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <img src={student} alt="" />
                    <span>List of Quiz</span>
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
                <p>mohssine</p>
                <p>student</p>
              </div>
              <i className='bx bx-log-out'></i>
            </li>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Navbar;
