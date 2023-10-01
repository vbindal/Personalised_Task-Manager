const User =  require('../models/user')
const bcrypt = require('bcrypt')
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../error/custom-error')
const jwt = require('jsonwebtoken')

const signUp = asyncWrapper(async(req,res,next)=>{

    const{
        email,password
    }=req.body

    
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(409).json({
          message: "Username or email already exists.",
        });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        email,
        password: hashedPassword
    })
    await newUser.save();
    console.log(newUser)
    res.status(201).json({
      message: "User registered successfully.",
      User: newUser,
    });
    // next();
    
})


const logIn = asyncWrapper(async(req,res)=>{
    const{
        email,password
    }=req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        res.status(404).send('invalid password')
    } 
    await user.save();

    const payload = {
      userID: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 2589200000
    });
    res.cookie("token",token,{
      httpOnly:true
    })
    res.status(200).json({ message: "Login successful", token });
    // return token;
})

const authforlogOut = asyncWrapper(async(req,res,next)=>{
    const token = req.cookies.jwt
    const verifyUser = jwt.verify(token,process.env.JWT_SECRET)
    console.log(verifyUser)
    
    const user = await User.findOne({id:verifyUser._id})
    console.log(user.email)

    req.token = token
    req.user = user
    res.clearCookie("token")
    console.log("logOut Successfully")
    await req.user.save()
    
    next()
    
})



// const authenticateToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403); 
//     }

//     req.user = user;
//     next();
//   });
// };




module.exports = {
    signUp,logIn,authforlogOut
}