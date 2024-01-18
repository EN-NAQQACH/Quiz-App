
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Nav.css'
import photoo from'../assets/hello.gif'
import photo from '../assets/react.svg'

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/Login');
      }
    }, [navigate]);

    return (
        <div className="content">
          <div className="role">
          <h1>Hi {localStorage.getItem('userRole')}!</h1>
          <img src={photoo} alt="" />
          </div>
        </div>
    )
}
export default HomePage;