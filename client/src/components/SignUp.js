import React, {useState} from 'react'
import logo from "../image/logo.png"
import '../css/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


function SignUp() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
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
       fetch("http://localhost:8010/signup", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email:email,
            name: name,
            userName:userName,
            password:password
        })
       }).then(res=>res.json())
       .then(data =>
        
         {if(data.error){
            notify1(data.error)
         }else{
            notify2(data.message)
            navigate("/login")
         }
            console.log(data)})
    }

  return (
    <div className='signUp'>
        <div className='form-container'>
            <div className='form'>
            <img className='signUpLogo' src={logo} alt=""></img>
            <p className='signUpText'>
            Sign up to see photos and videos <br/>
            from your friends
        </p>

        <div>
            <input type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e) =>{setEmail(e.target.value)}}/>
        </div>
        <div>
            <input type='text' name='name' id='name' placeholder='Full Name' value={name} onChange={(e) =>{setName(e.target.value)}}/>
        </div>
        <div>
            <input type='text' name='username' id='username' placeholder='Username'  value={userName} onChange={(e) =>{setUserName(e.target.value)}}/>
        </div>
        <div>
            <input type='password' name='password' id='password' placeholder='Password'  value={password} onChange={(e) =>{setPassword(e.target.value)}}/>
        </div>
        <p className='signupText' style={{fontSize: "12px", margin:"3px 0px"}}>By signing up, you agree to our Terms , <br/> Privacy Policy and Cookies Policy .

</p>
<input type='submit' id='submit-btn' value="Sign Up" onClick={() => {addData()}}/>
            </div>
<div className='form2'>
    Have an account?<Link to="/login"> <span style={{color: "blue", cursor:'pointer'}}>Login</span></Link>
</div>
            
        </div>
       
    </div>
  )
}

export default SignUp
