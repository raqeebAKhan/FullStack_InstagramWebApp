const express = require("express");
const app = express();
const PORT = 8010;
const mongoose = require("mongoose")
const cors = require("cors")

app.use(cors())
require('./models/modelSchema')
require("./models/modelpost")
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))
app.use(require("./routes/user"))
mongoose.connect("mongodb+srv://instaapp:insta12345asdf@cluster0.ne7twr6.mongodb.net/?retryWrites=true&w=majority")

mongoose.connection.on("connected", () =>{
    console.log("successfully connected to mongodb")
})

mongoose.connection.on("error", () =>{
    console.log("not connected to mongodb")
})

app.listen(PORT, () =>{
    console.log("server is running on " + PORT)
})