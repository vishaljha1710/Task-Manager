
const {mongoose}= require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const classSchema= new mongoose.Schema({
    username: {  
        type:String,
        required: true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        confirmpassword:{
            type:String,
            required:true,
            unique:true
        },
        phone:{
            type:Number,
            required: true,
            unique: true
        },
        age:{
            type:Number,
            required:true,
        },
        tokens:[{
            token:{
                type: String,
                required:true,
            }
        }]

   
});
try{
classSchema.methods.generatetoken = async function(){

         const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        this.save();
        return token;
  

}


classSchema.pre("save" , async function(next){
    if(this.isModified('password')){
    this.password=await bcrypt.hash(this.password,10);
    this.confirmpassword= await bcrypt.hash(this.password,10);}
    next();
});
}
catch(e){
       console.log(e);
     }
const Register= mongoose.model('Register',classSchema);

module.exports =Register;