import React,{useState} from 'react'
import logo from "../image/logo.png"
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

function ForgotPassword() {
  const { id, token } = useParams();
console.log({id, token})

  const [password, setPassword] = useState("");


  
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const notify1 = (message) => toast.error(message);


  const userValid = async () => {
    const res = await fetch(`/forgotpassword/${id}/${token}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json()

    if (data.status == 201) {
        console.log("user valid")
    } else {
        navigate("*")
    }
}





const sendpassword = async (e) => {
  e.preventDefault();

  if (password === "") {
      notify1("password is required!", {
          position: "top-center"
      });
  } else if (password.length < 6) {
      notify1("password must be 6 char!", {
          position: "top-center"
      });
  } else {
      const res = await fetch(`/${id}/${token}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ password })
      });

      const data = await res.json()

      if (data.status == 201) {
          setPassword("")
          setMessage(true)
      } else {
        notify1("! Token Expired generate new LInk",{
              position: "top-center"
          })
      }
  }
}

useEffect(() => {
    userValid()
  
}, [])




  return (

    
    
    <div className='logIn'>
    <div>
      <div className='loginForm'>
      <img className='signUpLogo' src={logo} alt=""></img>

      {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfully Update </p> : ""}

      <div>
      <input type='password' name='password' id='email' placeholder='New Password' value={password} onChange={(e) =>{setPassword(e.target.value)}} />
      </div>
      
      <input type='submit' id='login-btn' value="Send" onClick={sendpassword}/>

     

      </div>
    
      
    </div>
  </div>
  )
  
}

export default ForgotPassword

