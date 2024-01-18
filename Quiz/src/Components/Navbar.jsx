import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import "../Styles/Nav.css"
import student from "../assets/book.png"
/********************************** */
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, InfoCircleOutlined, PlusCircleOutlined, LogoutOutlined} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import HomePage from "./HomePage";
const { Header, Sider } = Layout;

/*********************************** */
const Navbar = ({ isTeacher }) => {
  // const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  // const [isSubMenuOpen2, setSubMenuOpen2] = useState(false);
  // const [isSubMenuOpen3, setSubMenuOpen3] = useState(false);
  // const handleSubMenuToggle = () => {
  //   setSubMenuOpen(!isSubMenuOpen);
  // };
  // const handleSubMenuToggle2 = () => {
  //   setSubMenuOpen2(!isSubMenuOpen2);
  // };
  // const handleSubMenuToggle3 = () => {
  //   setSubMenuOpen3(!isSubMenuOpen3);
  // };
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

  //if the user is not a teacher hide the quiz
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


  /****************************************** */

  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    const rootElement = document.getElementById("root");
    const userrole = document.getElementById("userrole");
    if (rootElement) {
      rootElement.style.left = collapsed ? "80px" : "200px";
      rootElement.style.width = collapsed ? "calc(100% - 80px)" : "calc(100% - 200px)";
      userrole.style.left = collapsed ? "calc(100% - 260px)":"calc(100% - 380px)"
    }
  }, [collapsed]);

  /*******************************************/


  return (
    <Layout>
      <Sider className="aside" collapsed={collapsed} collapsible trigger={null}>
        <h1 className="logo">logo</h1>
        <Menu theme="dark" mode="inline" className="menulist">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.SubMenu key="class" icon={<HomeOutlined />} title="Class">
          {isTeacher && (
            <Menu.Item key="class1" icon={<PlusCircleOutlined />}><Link to="/Class/Add">Add a Class</Link></Menu.Item>)}
            {!isTeacher && (
                          <Menu.Item key="class1" icon={<PlusCircleOutlined />}><Link to="/Class/Join">Join a Class</Link></Menu.Item>)}
            <Menu.Item key="class2" icon={<HomeOutlined />}><Link to="/Classes">Classes</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="quiz" icon={<HomeOutlined />} title="Quiz">
          {isTeacher && (
              <Menu.Item key="quiz1" icon={<PlusCircleOutlined />}>
                <Link to="/Quiz/Add">Add a Quiz</Link>
              </Menu.Item>
            )}
            <Menu.Item key="quiz2" icon={<HomeOutlined />}><Link to="/Quizez">Quizez</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="info" icon={<InfoCircleOutlined />}>
            <Link to="/info">Info</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className="header" >
          <Button
            className="toggle" r
            onClick={() => setCollapsed(!collapsed)}
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined />
              : <MenuFoldOutlined />}
          />
          <div id="userrole">
            <div className="photo">
              {<UserOutlined />}
            </div>
            <div className="text">
              <p>{username}</p>
              <p>{role}</p>
            </div>
            <div className="btn-log">
            <button onClick={handleLogout}><LogoutOutlined/></button>
            </div>
          </div>
        </Header>
      </Layout>
    </Layout>

  )
};

export default Navbar;
