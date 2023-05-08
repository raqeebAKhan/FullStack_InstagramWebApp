const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const { route } = require("./auth");
const POST = mongoose.model("POST")


router.get("/allposts",checkLogin,(req, res) =>{
    POST.find()
    .populate("postedBy","_id name Photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then(posts=>res.json(posts))
    .catch(error=> console.log(error))
})

router.post("/post",checkLogin,(req, res) =>{
    const {body, pic} = req.body;
    if(!body || !pic){
        return res.status(422).json({error:"please enter all fields "})
    }
  

   const post = new POST({
    body,
    photo:pic,
    postedBy: req.user
   })
   post.save().then((result)=>{
    return res.json({post:result})
   }).catch(err => console.log(err))

})

router.get("/myposts",checkLogin,(req,res)=>{
    POST.find({postedBy: req.user._id})
    .populate("postedBy","_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then(myposts=>{
        res.json(myposts)
    })
  
})

router.put("/like",checkLogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true

    })
    .populate("postedBy", "_id name Photo")
    .then((result)=>{
        return res.json(result)
       }).catch(err => console.log(err))
    
    })


router.put("/unlike",checkLogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true

    }).populate("postedBy", "_id name Photo")
    .then((result)=>{
        return res.json(result)
       }).catch(err => console.log(err))
    
    })

router.post("/comment",checkLogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
        
    })
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name Photo")
    .then((result)=>{
        return res.json(result)
       }).catch(err => console.log(err))
    
    })


    router.delete("/deletePost/:postId", checkLogin, (req, res) => {
        POST.findOne({ _id: req.params.postId })
            .populate("postedBy", "_id")
            .exec((err, post) => {
                if (err || !post) {
                    return res.status(422).json({ error: err })
                }
    
                if (post.postedBy._id.toString() == req.user._id.toString()) {
    
                    post.remove()
                        .then(result => {
                            return res.json({ message: "Successfully deleted" })
                        }).catch((err) => {
                            console.log(err)
                        })
                }
            })
    })

    router.get("/myfollwingpost", checkLogin, (req, res) => {
        POST.find({ postedBy: { $in: req.user.following } })
            .populate("postedBy", "_id name")
            .populate("comments.postedBy", "_id name")
            .then(posts => {
                res.json(posts)
            })
            .catch(err => { console.log(err) })
    })
    
            
        

module.exports= router

