require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
require("./db/conn");
const path = require("path");
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const Register = require("./models/registration");
const cookieParser = require("cookie-parser");
const homeverify = require("./middleware/homeverify");
const auth = require("./middleware/auth");
const { register } = require("module");

hbs.registerHelper("eq", function (a, b, options) {
  if (a === b) {
    return true;
  } else {
    return false;
  }
});

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});

//static file
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("", homeverify, (req, res) => {
  try {
    res.render("index", { name: req.user.username });
  } catch (e) {
    res.render("index");
  }
});

//backup response
app.get("", (req, res) => {
  res.send("hello");
});
app.get("/dashboard", auth, async (req, res) => {
  res.render("dashboard", { name: req.user.username, user: req.user });
});
app.post("/dashboard", auth, async (req, res) => {
  const user = req.user;
  var record = {};

  //updating the database
  if (req.body.op == 1) {
    record = await Register.findOneAndUpdate(
      { _id: user._id, "dashboard.tasks": req.body.text }, // Query to find the document and element
      { $set: { "dashboard.$.box": req.body.box } }, // Update operation
      { new: true } // Return the modified document
    );
  } else if (req.body.op == 0) {
    record = await Register.findOneAndUpdate(
      { _id: user._id }, // Query to find the document and element
      { $push: { dashboard: { box: "Tasks", tasks: req.body.text } } }, // Add operation
      { new: true } // Return the modified document
    );
  } else {
    record = await Register.findOneAndUpdate(
      { _id: user._id, "dashboard.tasks": req.body.text }, // Query to find the document and element
      { $pull: { dashboard: { tasks: req.body.text, box: req.body.box } } }, // delete operation
      { new: true } // Return the modified document
    );
  }

  console.log(record);
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Register.findOne({ username: username });

    //    console.log(token);

    // module.exports = user;
    if (await bcrypt.compare(password, user.password)) {
      const token = await user.generatetoken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      });
      res.render("index", { name: user.username });
    } else {
      res.render("login", { error: "invalid credential" });
    }
  } catch (e) {
    res.render("login", { error: "invalid credential" });
  }
});
app.get("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("jwt");

    // logout for single token or one device
    // req.user.tokens=req.user.tokens.filter((currelement)=>{
    //     return currelement.token!==req.token;
    // })

    // logout from all devices
    req.user.tokens = [];
    console.log("logout succsessfull!!");

    await req.user.save();

    res.render("login");
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (password === confirmpassword) {
      const registeremployee = new Register({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        phone: req.body.phone,
        age: req.body.age,
      });
      const token = await registeremployee.generatetoken();
      //    console.log(token);

      res.status(201).render("login");
    } else {
      res.end("password not matching");
    }
  } catch (error) {
    console.log(error);
    res.send("email or phone no already in use");
  }
});
