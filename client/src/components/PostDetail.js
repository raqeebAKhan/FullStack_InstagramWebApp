import React from 'react'
import "../css/PostDetail.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function PostDetail({ item,toggleDetails }) {


  const navigate = useNavigate();

  const notify2 = (message) => toast.success(message);

  const removePost = (postId) => {
    if (window.confirm("Do you really want to delete this post ?")) {
      fetch(`http://localhost:8010/deletePost/${postId}`, {
        method: "delete",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toggleDetails();
        navigate("/");
        notify2(result.message);
        });
    }
  };
  
  return (
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
      <div
              className="delete"
              onClick={() => {
                removePost(item._id);
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </div>

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
      <input type='text' placeholder='Add a comment' 
   
      />
     <button
              className="comment"
             
            >POST</button>
      </div>

      </div>
    </div>
    <div
        className="close-comment"
        onClick={() => {
          toggleDetails();
        }}
      >
        <span className="material-symbols-outlined material-symbols-outlined-comment">
          close
        </span>
      </div>
  </div>
  )
}

export default PostDetail
