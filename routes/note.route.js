const express = require("express");
const { NoteModel } = require("../models/note.model");
const jwt=require("jsonwebtoken")
const {auth}=require('../middleware/auth.middleware')
const noteRouter = express.Router();



// restricted routes
noteRouter.post("/create",auth,async (req,res)=>{
    
    try {
        
        const notes=await NoteModel(req.body)
        await notes.save()
        res.status(200).send({"msg":"A new note has been added !wip..."})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

noteRouter.get("/",auth,async(req,res)=>{
    try {
        const notes=await NoteModel.find({userID:req.body.userID})
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})


noteRouter.patch("/update/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    try {
        // if("the person who is making the req(id)"==="user id present in note")
        const note=await NoteModel.findOne({_id:noteID})
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send({"msg":`note with ID${noteID} has been Updated now.`})
        }else{
            res.status(400).send({"msg":`not autorized patch`})
        }
        
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

noteRouter.delete("/delete/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params
    try {
        // if("the person who is making the req(id)"==="user id present in note")
        const note=await NoteModel.findOne({_id:noteID})
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({"msg":`note with ID${noteID} has been Deleted now.`})
        }else{
            res.status(400).send({"msg":`not autorized patch`})
        }
        
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})
 

module.exports={
    noteRouter
}