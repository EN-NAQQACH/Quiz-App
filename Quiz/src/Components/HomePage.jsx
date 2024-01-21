
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Nav.css'
import photoo from'../assets/hello.gif'
import photo from '../assets/react.svg'

function HomePage() {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const fetchuser = async () => {
        const res = await fetch('https://quiz-app.eroslabs.live/api/user/info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        const data = await res.json()
        setusername(data.username)
    }
    useEffect(() => {
      fetchuser();
      if (!localStorage.getItem('token')) {
        navigate('/');
      return;
      }
    }, []);

    return (
        <div id="content">
          <div className="role">
          <h1>Hi {username} !</h1>
          <img src={photoo} alt="" />
          </div>
        </div>
    )
}
export default HomePage;