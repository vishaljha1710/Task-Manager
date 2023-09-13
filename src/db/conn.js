const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1/registration").then(()=>{
    console.log(`connection succesfull`);
}).catch((e)=>{
    console.log(`no conncection`);

});

