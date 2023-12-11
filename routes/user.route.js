const express = require("express");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

userRouter.post("/register", async(req, res) => {
  const { username, email, pass } = req.body
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.status(200).send({ error: err });
      } else {
        const user = new UserModel({ username, email, pass: hash });
        await user.save();
        res.status(200).send({ msg: "new user registered" });
      }
    });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});


userRouter.post("/login", async (req, res) => {
    const {email,pass}=req.body
    try {
        const user=await UserModel.findOne({email})
        bcrypt.compare(pass, user.pass, async(err, result)=> {
            // result == true
            if(result){
                const token=jwt.sign({userID:user._id,username:user.username},"masai")
                res.status(200).send({"msg":"Login Succes hd","token":token})
            }else{
                res.status(200).send({ "err": "Wrong Credentials dip.."});
            }
        });
    } catch (error) {
        res.status(400).send({ err: error });
    }
});

module.exports = {
  userRouter,
};
