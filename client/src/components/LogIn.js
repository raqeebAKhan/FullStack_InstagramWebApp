import React, {useState, useContext} from 'react'
import logo from "../image/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import '../css/LogIn.css'
import { toast } from 'react-toastify';
import { LoginContext } from '../contex/LoginContext';

function LogIn() {
  const {setUserLogin} = useContext(LoginContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate("")

  const notify1 = (message) => toast.error(message);
  const notify2 = (message) => toast.success(message);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  const addData = () => {
    if(!emailRegex.test(email)){
        notify1("Invalid email")
        return
    }
   fetch("http://localhost:8010/login", {
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email:email,
        password:password
    })
   }).then(res=>res.json())
   .then(data =>
    
     {if(data.error){
        notify1(data.error)
     }else{
        notify2("LoggedIn Successfully")
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        setUserLogin(true)
        navigate("/")
     }
        console.log(data)})
}

  return (
    <div className='logIn'>
      <div>
        <div className='loginForm'>
        <img className='signUpLogo' src={logo} alt=""></img>
        <div>
        <input type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e) =>{setEmail(e.target.value)}}/>
        </div>
        <div>
        <input type='password' name='password' id='password' placeholder='Password'  value={password} onChange={(e) =>{setPassword(e.target.value)}}/>
        </div>
        <input type='submit' id='login-btn' value="Log In" onClick={() => {addData()}}/>

        </div>
        <div className='loginForm2'>
        Don't have account? <Link to='/signup'><span style={{color:"blue", cursor:"pointer"}}>Sign Up</span></Link>
        <Link to='/passwordreset'>  <p style={{color: "blue", fontSize:"15px"}} >Forgot Password?</p></Link>
        
        </div>
        
      </div>
    </div>
  )
}

export default LogIn
