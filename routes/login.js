const express = require("express")
const mongoose = require("mongoose")
const joi = require("joi")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router();

const loginSchema =joi.object ({
    email:joi.string().required().email().min(6),
    password:joi.string().required().min(6),
})

router.post("/", async (req, res) => {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) return res.status(400).send("Wrong Email");
  
      let user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("Wrong email or password");
  
      const checkResult = await bcrypt.compare(req.body.password, user.password);
      if (!checkResult) return res.status(400).send("Wrong email or password");
  
      const token = jwt.sign(
        { _id: user._id, name: req.body.name, isBuisness: user.isBuisness },
        process.env.JWTKEY
      );
  
      res.status(200).send(token);
    } catch (error) {
      res.status(400).send(error);
    }
  });


module.exports = router;