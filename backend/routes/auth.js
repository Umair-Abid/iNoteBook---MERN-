const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require ('../middleware/fetchuser')

const jwtSecret='iamumair@dev';
router.post(
  "/createuser",
  [
    body("email", "Enter a valid Email address").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("name", "Name must be atleast 3 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry the user with this Email already exists " });
      }
      let salt= await bcrypt.genSalt(10);
      let secPass= await bcrypt.hash(req.body.password,salt)
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      const data={
          user:{ id: user.id}  
            }
      const authToken=jwt.sign(data,jwtSecret)
      success=true;
      res.json({success,authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post(
    "/login",
    [
      body("email", "Enter a valid Email address").isEmail(),
      body("password", "Password cannot be empty").exists()],
    async (req, res) => {
      let success=false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {email,password}=req.body;
      try {
        let user = await User.findOne({email});
        if (!user) {
          return res
        .status(400)
            .json({ success,error: "Please try with your correct credentials" });
        }
        const comparePass= await bcrypt.compare(password,user.password)
        if (!comparePass) {
            return res
          .status(400)
              .json({ success,error: "Please try with your correct credentials" });
          }
            const data={
                user:{ id: user.id}  
                  }
            const authToken=jwt.sign(data,jwtSecret)
            success=true;
            res.json({success,authToken});
    }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
          }});

          
    
        router.post(
            "/getuser",fetchuser,
            async (req, res) => {
              try {
                const userId=req.user.id;
                let user = await User.findById(userId).select('-password');
                console.log(user)
                res.send(user)
            
            }
                catch (error) {
                    console.error(error.message);
                    res.status(500).send("Internal Server Error");
                  }});

module.exports = router;
