const express=require("express");
const {connection}=require("./db");
const { userRouter } = require("./routes/user.route");
const {noteRouter}=require("./routes/note.route")
const app=express()

app.use(express.json())

app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to db");
        console.log("server is running at 8080")
    } catch (error) {
        console.log(error)
    }
    
})