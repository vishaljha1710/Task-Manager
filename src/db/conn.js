const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://romanvkj2001:raiden_1708@cluster0.hsd1rp6.mongodb.net/registration?retryWrites=true&w=majority").then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection`);
});
