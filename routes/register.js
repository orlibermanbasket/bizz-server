const express = require("express")
const joi = require("joi")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const router = express.Router();

const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email:joi.string().required().email().min(6),
    password:joi.string().required().min(6),
    isBuisness:joi.boolean().required(),
    
})
 router.post("/", async(req,res)=>{
    try {
        //check details
        const {error} = registerSchema.validate(req.body);
        if(error) return res.status(400).send("wrong body");
        //check if user allready excits
        let user = await User.findOne({email: req.body.email})
        if(user) return res.status(400).send("user allready exists");

        user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password,salt)
        await user.save();
 
         //craete token
 const token = jwt.sign({_id: user._id, isBuisness:req.body.isBuisness },process.env.JWTKEY);
 res.status(201).send(token)

    } catch (error) {
        res.status(400).send(error)
    }
 })



module.exports = router;