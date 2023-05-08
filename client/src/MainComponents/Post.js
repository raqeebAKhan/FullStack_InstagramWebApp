import React,{useState, useEffect} from 'react'
import '../css/Post.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { json } from 'react-router-dom'

function Post() {
  const [body, setBody]=useState("")
  const [image, setImage]=useState("")
  const [url, setUrl]=useState("")

  const navigate = useNavigate("")

  const notify1 = (message) => toast.error(message);
  const notify2 = (message) => toast.success(message);

  useEffect(()=>{
    if(url){
      fetch("http://localhost:8010/post",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          body,
          pic:url
        })
      }).then(res => res.json())
      .then(data=>{if(data.error){
        notify1(data.error)
      }else{
        notify2("Posted Successfully")
        navigate("/")
      }})
      .catch(err =>console.log(err))
    }

  },[url])


  const postContents = () =>{
    console.log(body, image);
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset", "insta-image")
    data.append("cloud_name", "brilliantcloud")
    fetch("https://api.cloudinary.com/v1_1/brilliantcloud/image/upload",{
      method:"post",
      body:data
    }).then(res=>res.json())
    .then(data=>setUrl(data.url))
    .catch(error=>console.log(error));

    
  }


  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); 
    };
  }
  return (
    <div className='post'>
      <div className='post-header'>
      <h4 style={{margin: "3px auto"}}>Add New Post</h4>
      <button id='post-btn'onClick={()=>[
        postContents()
      ]}>Share</button>
      </div>
      <div className='main-div'>
        <img id="output" src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png'/>
        <input type='file' accept='image/*' onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0])
          }}/>
      </div>
     <div className='details'>
      <div className='card-header'>
        <div className='card-pic'>
          <img src='https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png' alt=''/>
        </div>
        <h5>Furqan Khan</h5>
      </div>
      <textarea value={body} onChange={(e) =>{
        setBody(e.target.value)
      }} type='text' placeholder='Write a caption'/>
     </div>
    </div>
  )
}

export default Post
