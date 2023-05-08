import React,{useContext} from 'react'
import logo from '../image/logo.png'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
import { LoginContext } from '../contex/LoginContext'
import { useNavigate } from 'react-router-dom'



function Navbar({login}) {
  const navigate = useNavigate()
  const {setModalOpen} = useContext(LoginContext)
  const loginStatus = () =>{
    const token = localStorage.getItem("jwt");
    if(login || token){
      return[
        <>
      <Link to="/profile"><p>Profile</p></Link>
      <Link to="/post"><p>Post</p></Link>
      <Link style={{ marginLeft: "20px" }} to="/myfollowingpost">
           All Posts
          </Link>
      <Link to={""}><button className='homebtn' onClick={()=>{
        setModalOpen(true)
      }}>Log out</button></Link>
        </>
      ]
    }else{
      return [<>
        <Link to="/signup"><p>SignUp</p></Link> 
     <Link to="/login"><p>LogIn</p></Link>
      </>]
    }
  }

  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/">
            <li>
              <span class="material-symbols-outlined">home</span>
            </li>
          </Link>
          <Link to="/profile">
            <li>
              <span class="material-symbols-outlined">account_circle</span>
            </li>
          </Link>
          <Link to="/createPost">
            <li>
              <span class="material-symbols-outlined">add_box</span>
            </li>
          </Link>
          <Link style={{ marginLeft: "20px" }} to="/followingpost">
            <li>
              <span class="material-symbols-outlined">explore</span>
            </li>
          </Link>
          <Link to={""}>
            <li onClick={() => setModalOpen(true)}>
              <span class="material-symbols-outlined">logout</span>
            </li>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className='navbar'>
     <img id="insta-logo" src={logo} alt='' onClick={()=>{
      navigate("/")
     }}/>
     <ul className='nav-menu'>
   
     
    {loginStatus()}
     
     </ul>

     <ul className='nav-mobile'>
   
     
   {loginStatusMobile()}
    
    </ul>
    </div>
  )
}

export default Navbar

