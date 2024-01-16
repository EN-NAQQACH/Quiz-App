
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/App.css'
import photo from '../assets/react.svg'

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if there is no token or user authorization
      if (!localStorage.getItem('token') || !localStorage.getItem('userRole')) {
        // Redirect to the login page
        navigate('/Login');
      }
    }, [navigate]);

    return (
        <div className="Home">
            <h1>Hi {localStorage.getItem('userRole')}!</h1>
        </div>
    )
}
export default HomePage;