import React,{useEffect, useState} from 'react'
import '../css/profile.css'
import PostDetail from '../components/PostDetail'
import ProfilePhoto from '../components/ProfilePhoto'

function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [pic, setPic]=useState([])
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState("")
  const [changePhoto, setChangePhoto] = useState(false)

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePhoto) {
      setChangePhoto(false)
    } else {
      setChangePhoto(true)
    }
  }

  useEffect(()=>{
    fetch(`http://localhost:8010/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
      headers:{
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
    }).then((res) => res.json())
    .then((result) => {
      console.log(result)
      setPic(result.post);
      setUser(result.user)
      console.log(pic);
    });
}, []);

  return (
    <div className='container2'>
      <div className='profile-frame'>
        <div className='profile-pic'>
        <img
            onClick={changeprofile}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
        </div>
      <div className='profile-data'>
        <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
        <div className='profile-info'>
        <p>{pic ? pic.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
        </div>
      </div>
       

      </div>
      <hr style={{
        width: "90%",
        margin: "25px auto",
        opacity: 0.8,
      }}/>
     <div className='gallery'>
    {pic.map((pics)=>{
      return <img key={pics._id} src={pics.photo} onClick={()=>{
        toggleDetails(pics)
      }}/>
    })}
     
     </div>
     {show &&
     <PostDetail item={posts} toggleDetails={toggleDetails}/>
}

{
        changePhoto &&
        <ProfilePhoto changeprofile={changeprofile} />
      }
    </div>
  )
}

export default Profile
