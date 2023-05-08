import React,{useEffect, useState} from 'react'
import "../css/Home.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


function Home() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const navigate = useNavigate()
  const [data, setData]=useState([])
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  const notify2 = (message) => toast.success(message);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }

    fetch("http://localhost:8010/allposts", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

 

  const likePost = (id) => {
    fetch("http://localhost:8010/like", {
      method: "PUT",
      headers:{
          "Content-Type": "application/json",
          "Authorization": "Bearer " +localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
          postId:id,
      })
     }).then(res=>res.json())
     .then(result =>
      
       { const newData = data.map((posts) => {
        if (posts._id == result._id) {
          return result;
        } else {
          return posts;
        }
      });
      setData(newData);
        console.log(result);
      });
  };
  const unlikePost = (id) => {
    fetch("http://localhost:8010/unlike", {
      method: "PUT",
      headers:{
          "Content-Type": "application/json",
          "Authorization": "Bearer " +localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
          postId:id,
      })
     }).then(res=>res.json())
     .then(result =>
      
       { const newData = data.map((posts) => {
        if (posts._id == result._id) {
          return result;
        } else {
          return posts;
        }
      });
      setData(newData);
        console.log(result);
      });
  };

  const buildComment=(text,id)=>{
    fetch("http://localhost:8010/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " +localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    }).then(res => res.json())
      .then(result => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        notify2("comment posted")
        console.log(result);
      });

      
  };
  return (
    <div className='container'>
      {data.map((posts)=>{
         return(
          <div className='card'>
          <div className='card-header'>
          <div className='card-pic'>
            <img src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink} alt=''/>
          </div>
          <h5>
            <Link to={`/profile/${posts.postedBy._id}`}>{posts.postedBy.name}</Link></h5>
          </div>
  
          <div className='card-image'>
            <img src={posts.photo} alt=''/>
          </div>
          
          <div className='card-content'>
            {
              posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? ( <span className="material-symbols-outlined material-symbols-outlined-red" onClick={()=>{
                unlikePost(posts._id)
              }}>favorite</span>) : (<span className="material-symbols-outlined" onClick={()=>{
                likePost(posts._id)
              }}>favorite</span>
             )
            }
       
          <p>{posts.likes.length} Like</p>
          <p>{posts.body}</p>
          <p
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  toggleComment(posts);
                }}
              >
                View all {posts.comments.length} comments
              </p>
          </div>
          <div className='add-comments'>
          <span className="material-symbols-outlined">mood</span>
          <input type='text' placeholder='Add a comment' value={comment} onChange={(e)=>{
            setComment(e.target.value)
          }}/>
          <button className='comment' onClick={()=>{
                buildComment(comment,posts._id)
              }}>POST</button>
          </div>
  
        </div>
         )
      })}
     
     {show && (
      <div className='showComment'>
        <div className='comment-container'>
          <div className='postPic'>
            <img src={item.photo} alt=''/>
          </div>
          <div className='details'>
          <div className='card-header' style={{borderBottom:"1px solid black"}}>
          <div className='card-pic'>
            <img src='https://i.pinimg.com/736x/3a/12/32/3a1232d28faf62d70400e904f520ec99.jpg' alt=''/>
          </div>
          <h5>{item.postedBy.name}</h5>
          </div>
          <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((comment) => {
                  return (
                    <p className="comm">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {comment.postedBy.name}{" "}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>


          <div className='card-content'>
           
       
          <p>{item.likes.length} Like</p>
          <p>amazing</p>
          </div>

          <div className='add-comments'>
          <span className="material-symbols-outlined">mood</span>
        
          <input type='text' placeholder='Add a comment' value={comment} onChange={(e)=>{
            setComment(e.target.value)
          }}/>
         <button
                  className="comment"
                  onClick={() => {
                    buildComment(comment, item._id);
                    toggleComment();
                  }}
                >POST</button>
          </div>

          </div>
        </div>
        <div
            className="close-comment"
            onClick={() => {
              toggleComment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
      </div>
     )}
    </div>
  )
}

export default Home
