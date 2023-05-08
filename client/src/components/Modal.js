import React from 'react'
import "../css/Modal.css"
import { useNavigate } from 'react-router-dom'

function Modal({setModalOpen}) {
  const navigate = useNavigate()
  return (
    <div className='darkBg' onClick={()=>{setModalOpen(false)}}>
   <div className="centered">
      <div className="modalContainer">

       
       
        <div className="modalHeading">Log out of your account?</div>
        <div className="modalFunctions">
          <div className="functions">
            <button className="logoutBtn" onClick={()=>{setModalOpen(false)
            localStorage.clear()
            navigate("./login")
            }}>
              Log Out
            </button>

            <button className="cancelBtn" onClick={()=>{setModalOpen(false)}}>
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>

    
  )
}

export default Modal
