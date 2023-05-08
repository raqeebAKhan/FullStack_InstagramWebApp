const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Jwt_secret} = require("../key");
const checkLogin = require("../middlewares/checkLogin");
const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user:"furqan45627@gmail.com",
    pass: "ridwqgzofcahzbbe"
  }
})

router.get('/', (req,res)=>{
    res.send("hello")
})

router.post("/signup",(req,res)=>{
  const {email, name, userName, password} = req.body;
  if( !email || !name || !userName || !password){
    res.status(422).json({error: "please enter all fields"})
  }
  USER.findOne({$or: [{email:email}, {userName: userName}]}).then((userExist) => {
    if(userExist){
      return res.status(422).json({error: "User already exist"})
    }
    bcrypt.hash(password, 12).then((hashedPassword)=>{
      const user = new USER({
        email,
        name,
        userName,
        password : hashedPassword
      })
    
      user.save()
      .then(user =>{res.json({message: "Registered successfully"})})
      .catch(error => console.log(error))

    })
    
  })

  
})

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(422).json({ error: "Please add email and password" })
  }
  USER.findOne({ email: email }).then((userExist) => {
      if (!userExist) {
          return res.status(422).json({ error: "Invalid email" })
      }
      bcrypt.compare(password, userExist.password).then((match) => {
          if (match) {
              // return res.status(200).json({ message: "Signed in Successfully" })
              const token = jwt.sign({ _id: userExist.id }, Jwt_secret)
              const { _id, name, email, userName } = userExist

              res.json({ token, user: { _id, name, email, userName } })

              console.log({ token, user: { _id, name, email, userName } })
          } else {
              return res.status(422).json({ error: "Invalid password" })
          }
      })
          .catch(err => console.log(err))
  })
})


router.post("/passwordlink", async(req, res) =>{
  console.log(req.body)

  const {email} = req.body;
  if(!email){
    res.status(401).json({status:401, message:"Enter Your Email"})
  }

  try{
    const userExist = await USER.findOne({email:email})

   const token = jwt.sign({_id:userExist._id},Jwt_secret,{
    expiresIn:"120s"
   })
const setusertoken = await USER.findByIdAndUpdate({_id:userExist._id},{verifytoken:token},{new:true})



if(setusertoken){
  const mailOptions = {
      from:"furqan45627@gmail.com",
      to:email,
      subject:"Sending Email For password Reset",
      text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userExist.id}/${setusertoken.verifytoken}`
  }

  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        console.log("error",error);
        res.status(401).json({status:401,message:"email not send"})
    }else{
        console.log("Email sent",info.res);
        res.status(201).json({status:201,message:"Email sent Successfully"})
    }
})
}
  }catch(error){

    res.status(401).json({status:401,message:"invalid user"})

  }
})

router.get("/forgotpassword/:id/:token",async(req,res)=>{
  const {id,token} = req.params;

  try {
      const validuser = await USER.findOne({_id:id,verifytoken:token});
      
      const verifyToken = jwt.verify(token,Jwt_secret);

      console.log(verifyToken)

      if(validuser && verifyToken._id){
          res.status(201).json({status:201,validuser})
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }

  } catch (error) {
      res.status(401).json({status:401,error})
  }
});


router.post("/:id/:token",async(req,res)=>{
  const {id,token} = req.params;

  const {password} = req.body;

  try {
      const validuser = await USER.findOne({_id:id,verifytoken:token});
      
      const verifyToken = jwt.verify(token,Jwt_secret);

      if(validuser && verifyToken._id){
          const newpassword = await bcrypt.hash(password,12);

          const setnewuserpass = await USER.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})

      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
  } catch (error) {
      res.status(401).json({status:401,error})
  }
})


module.exports = router;