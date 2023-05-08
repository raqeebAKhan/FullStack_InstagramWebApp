import './App.css';
import React,{createContext, useState} from 'react';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Navbar from './components/navbar';
import Home from './MainComponents/Home';
import Post from './MainComponents/Post';
import Profile from './MainComponents/Profile';
import UserProfile from './components/UserProfile';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './contex/LoginContext';
import Modal from './components/Modal';
import MyFollowingPost from './MainComponents/MyFollowingPosts';
import PasswordReset from './components/PasswordReset';
import ForgotPassword from './components/ForgotPassword';
import Error from './components/Error';




function App() {
  const [userLogin, setUserLogin] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserLogin , setModalOpen}}>
      <Navbar login={userLogin}/>
  <ToastContainer theme='dark'/>
  {modalOpen && <Modal setModalOpen={setModalOpen}/>}
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/login" element={<LogIn/>}></Route>
    <Route exact path="/profile" element={<Profile/>}></Route>
    <Route path="/post" element={<Post/>}></Route>
    <Route path="/profile/:userid" element={<UserProfile/>}></Route>
    <Route path="/myfollowingpost" element={<MyFollowingPost/>}></Route>
    <Route path="/passwordreset" element={<PasswordReset/>}></Route>
    <Route path="/forgotpassword/:id/:token" element={<ForgotPassword/>}></Route>
    <Route path="*" element={<Error />} />



  </Routes>

      </LoginContext.Provider>
 
    </div>
    </BrowserRouter>
  );
}

export default App;
