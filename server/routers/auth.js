// const { request } = require("express");
const bcryptjs =require('bcryptjs')
const express = require('express')
// const nodemailer=require("nodemailer")
// const mailgun =require("nodemailer-mailgun-transport")
const router = express.Router()
const jwt=require('jsonwebtoken')
// const httpProxy = require('http-proxy');
// const {requireSignin}=require('../middleware')
// const proxy = httpProxy.createServer({});
// const passport=require('passport')
// const {promisify}=require("util")
const Signup=require('../models/signup');
const { token } = require('morgan');
// const { db } = require("../models/signup");
// const { Router } = require('express');
// const { token } = require('morgan');
// require("dotenv").config({path: '../../.env'});
// const tmp = require('../')
// require("dotenv").config({path:'../'});
const JWT_SECRET=process.env.JWT_SECRET
const JWT_EXPIRES=process.env.JWT_EXPIRES
// const JWT_EXPIRES='1h'
const NODE_ENV=process.env.NODE_ENV
// console.log(JWT_EXPIRES);
// console.log(JWT_SECRET);


const signJwt=(id)=>{
    console.log(id)
    return jwt.sign({id},JWT_SECRET,{
        expiresIn: JWT_EXPIRES
        // expiresIn: "30d"
    });
}

const sendToken=(user,statuscode,req,res)=>{
    const token=signJwt(user._id)
    console.log(token)
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+JWT_EXPIRES),
    })
    res.status(statuscode).json({
        token,
    })
}

// const signout=(req,res)=>{
//     res.clearCookie('token')
//     res.status(200).json({
//         message:"Signed out successfully !"
//     })
// }
//MIDDLEWARE

const decryptJwt=async(token)=>{
    const jwtverify=promisify(jwt.verify)
    return await jwtverify(token,JWT_SECRET)
}
// secure=async (req,res,next)=>{
//     let token
//     if(req.cookies) token=req.cookies.jwt
//     if(!token){
//         return res.status(401).json({
//             status:"unauthorized",
//             message:"You are not authorized to view the content"
//         })
//     }
//     const jwtInfo=await decryptJwt(token)
//     console.log(jwtInfo)
//     const user=await Signup.findById(jwtInfo.id)
//     req.user=user
//     next()
// }

// checkField=(req,res,next)=>{
//     var firstname=req.body.email
//     var email=req.body.email
//     var password=req.body.password
//     var cpassword=req.body.cpassword
//     if(!firstname || !email || !password || !cpassword){
//         console.log('Please enter all the fields')
//         res.send('Please enter all the fields')
//     }
//     else{
//         next()
//     }

// }


// checkFieldLogin=(req,res,next)=>{
//     var email=req.body.email
//     var password=req.body.password
//     if(!email || !password){
//         console.log('Please enter all the fields')
//         res.send('Please enter all the fields')
//     }
//     else{
//         next()
//     }

// }

// function checkUsername(req,res,next){
//     var email=req.body.email
//     var checkExistUsername=Signup.findOne({email:email})
//     checkExistUsername.exec((err,data)=>{
//         if(err)throw err
//         if(data){
//             console.log('Email Exists')
//             res.send('Email already exists')
//         }
//         else{
//             next()
//         }
//     })    
// }
// function checkPassword(req,res,next){
//     var password=req.body.password
//     var cpassword=req.body.cpassword
//     if(password!=cpassword){
//         console.log('Password did not matched')
//         res.send('Password did not matched')
//     }
//     else{
//         next()
//     }  
// }

// router.get('/',(req,res)=>res.send("This is Home page !!"))

router.post('/signup',async (req,res)=>{
    console.log("Signup :", req.body)
    // const data=req.body
    var firstname=req.body.firstname
    var lastname=req.body.lastname
    var email=req.body.email
    var number=req.body.number
    var password=req.body.password
    password=bcryptjs.hashSync(password,10) //encrypting the password

    try{
        const newSignup = await Signup.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            number:number,
            password:password
        })
        // generate token

        const token = jwt.sign({id:newSignup._id},JWT_SECRET,{
            expiresIn:"2h"
        })
        console.log(newSignup)


        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).send(newSignup)
    }
    catch(err){
        res.status(401).json(err.message);
    }
})
router.post('/login',async(req,res)=>{
    // console.log('Login :',req.body);

    try {
        const { email, password } = req.body;
    
        // validate
    
        if (!email || !password)
          return res
            .status(400)
            .json({ errorMessage: "Please enter all required fields." });
    
        const existingUser = await Signup.findOne({ email:email });

        // console.log(existingUser);
        if (!existingUser)
          return res.status(401).json({ errorMessage: "User not exist" });
    
        const passwordCorrect = await bcryptjs.compare(
          password,
          existingUser.password
        );

        // console.log(passwordCorrect);
        if (!passwordCorrect)
          return res.status(401).json({ errorMessage: "Wrong email or password." });

        // sign the token
    
        const token = jwt.sign({id:existingUser._id},JWT_SECRET,{
            expiresIn:"2h"
        })
        console.log(existingUser)


        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).send(existingUser)
      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
})


// http://localhost:5000/auth/user-details
router.get('/user-details/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    try{
        const result = await Signup.find({_id:id});
        res.send(result);
    }catch(err){
        res.status(404).send({error:err})
    }
});
// router.post('/checktoken',requireSignin,(req,res)=>{
//     res.status(200).json({})
// })
// router.post('/signout',requireSignin, signout)
// router.post('/feed',requireSignin,(req,res)=>res.status(200).json({
//     message:"Working fine"
// }))
// router.use(secure)
// router.post('/feed',requireSignin,(req,res)=>res.status(200).json({
//     message:"Working fine"
// }))

// router.post('/sendmessage',(req,res)=>{
//     console.log(req.body)
//     const {name,email,message}=req.body
//     const auth={
//         auth:{
//             api_key: `${process.env.MAIL_GUN_API_KEY}`,
//             domain: `${process.env.MAIL_GUN_DOMAIN}`
//         }
//     }

//     const transporter = nodemailer.createTransport(mailgun(auth))

//     const mailOption={
//         from:email,
//         to:'eswarupkumar1111@gmail.com',
//         subject:`Review from ${name}`,
//         text:message
//     }

//     transporter.sendMail(mailOption,(err,data)=>{
//         if(err) return res.status(500).json(err)
//         console.log(data)
//         res.status(200).json(data)
//     })
// })

module.exports = router;