import React, {useState} from 'react'
import { Link, json } from 'react-router-dom'
import logo from "../image/logo.png"
import { toast } from 'react-toastify';

function PasswordReset() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(false)

    const notify1 = (message) => toast.error(message);


    const sendLink = async(e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8010/passwordlink",{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
              },
              body: JSON.stringify({
                email: email,
              }),

        })

        const data = await res.json();

        if(data.status == 201){
            setEmail("");
            setMessage(true)
        }else{
            notify1("Invalid Email")
        }
    }
  return (
    <div className='logIn'>
    <div>
      <div className='loginForm'>
      <img className='signUpLogo' src={logo} alt=""></img>

      {message ? <p>Password Rest link is set to your Email</p>:""}
      <div>
      <input type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e) =>{setEmail(e.target.value)}}/>
      </div>
      
      <input type='submit' id='login-btn' value="Send" onClick={sendLink}/>

      </div>
    
      
    </div>
  </div>
  )
}

export default PasswordReset
