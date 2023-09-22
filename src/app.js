require('dotenv').config();
const express = require("express");
const app= express();
const bcrypt=require('bcryptjs');
require('./db/conn');
const path=require('path');
const port= process.env.PORT||3000;
const hbs=require('hbs');
const Register=require('./models/registration');
const cookieParser = require('cookie-parser');

const auth=require('./middleware/auth');

//global profile name for all pages 
var name="";

app.listen(port,()=>{
    console.log(`Server is running on : ${port}`);
})


//static file
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);



app.get("",(req,res)=>{
    res.render("index",{name:name});
    
})
//backup response
app.get("",(req,res)=>{
    res.send('hello');
    
})
app.get("/register",(req,res)=>{
    res.render("register");
    
})
app.get("/login",(req,res)=>{
    res.render("login");
    
})
app.post("/login", async (req,res)=>{
   try {
   const username=req.body.username;
   const password=req.body.password;
   
   const user= await Register.findOne({username:username});

   const token=await user.generatetoken();
//    console.log(token);
   res.cookie("jwt",token,{
    expires:new Date(Date.now()+600000),
    httpOnly:true
   });
   name=user.username;
   if(await bcrypt.compare(password,user.password)){
    res.render("dashboard",{name:name});
   }
   else{
    res.send("invalid credentials");
   }
}
   catch(e){
    res.status(400).send('Invalid Credentials');
    console.log(e);
   }
    
})
app.get("/logout",auth,async(req,res)=>{
    try{
        res.clearCookie("jwt");
  
        // logout for single token or one device
        // req.user.tokens=req.user.tokens.filter((currelement)=>{
        //     return currelement.token!==req.token;
        // })
        
        // logout from all devices
        req.user.tokens=[];
        name="";
        console.log("logout succsessfull");
        
        await req.user.save()
       
        res.render("login");

    }
    catch(e){console.log(e);
        // res.status(404).send(e);
    }

    
})
app.get("/about",(req,res)=>{
    res.render("about",{name:name});
    
})
app.post("/register",async (req,res)=>{
  try{
     const password=req.body.password;
     const confirmpassword=req.body.confirmpassword;
     if(password===confirmpassword){
           const registeremployee=new Register({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            confirmpassword:req.body.confirmpassword,
            phone:req.body.phone,
            age:req.body.age
           })
           const token= await registeremployee.generatetoken();
           //    console.log(token);
           await registeremployee.save();
           res.status(201).render("login");
     }
     else{
        res.end("password not matching");
     }
  }
  catch(error){
      res.send("email or phone no already in use");
  }
    
})



