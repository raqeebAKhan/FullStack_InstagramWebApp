import React,{useEffect, useState} from 'react'
import '../css/profile.css'
import PostDetail from './PostDetail'
import { useParams } from 'react-router-dom'


function UserProfile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    const { userid } = useParams();
    console.log(userid)

    const [user, setUser] = useState("");
    const [isFollow, setIsFollow] = useState(false);
    const [posts, setPosts] = useState([]);

    const followUser = (userId) => {
      fetch("http://localhost:8010/follow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
         "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsFollow(true);
        });
    };

    const unfollowUser = (userId) => {
      fetch("http://localhost:8010/unfollow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userId,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          console.log(data);
          setIsFollow(false);
        });
    };
  

    useEffect(() => {
        fetch(`http://localhost:8010/user/${userid}`, {

          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setUser(result.user);
          setPosts(result.post);
          if (
            result.user.followers.includes(
              JSON.parse(localStorage.getItem("user"))._id
            )
          ) {
            setIsFollow(true);
          }
        });
    }, [isFollow]);


  
  return (
    <div className='container2'>
      <div className='profile-frame'>
        <div className='profile-pic'>
          <img src={user.Photo ? user.Photo : picLink} alt=''/>
        </div>
      <div className='profile-data'>
        <h1>{user.name}</h1>
        <div className='profile-info'>
          <p>{posts.length}</p>
          <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>

        </div>
        <button
              className="follow-btn"
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
        <button className='message-btn'>Message</button>
        
      </div>
       

      </div>
      <hr style={{
        width: "90%",
        margin: "25px auto",
        opacity: 0.8,
      }}/>
     <div className='gallery'>
    {posts.map((pics)=>{
      return <img key={pics._id} src={pics.photo} 
    //   onClick={()=>{toggleDetails(pics)
    //   }}
      />
    })}
     
     </div>
     {/* {show &&
     <PostDetail item={posts} toggleDetails={toggleDetails}/>
} */}
    </div>
  )
}

export default UserProfile
