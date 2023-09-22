const register = require('../models/registration');
const jwt=require('jsonwebtoken');

const auth= async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token,process.env.SECRET_KEY);
        const user = await register.findOne({_id:verifyuser._id});
        console.log(user.username);


        req.user=user;
        req.token=token;

        next();
    }
    catch(e){
        console.log(e);
        res.render("../../templates/views/index.hbs");
    }


}

module.exports=auth;