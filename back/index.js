const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const mongoose=require('mongoose');
const cors=require("cors");
const {c, cpp, node, python, java}=require('compile-run');
const passport=require("passport");

//auth

const login=require("./auth/login");
const register=require("./auth/register");
const confirmation=require("./auth/confirmEmail");
const resend=require("./auth/resendLink");
const deleteAccount=require("./auth/deleteAccount");
const resetPassword=require("./auth/resetPassword");
const googleAuth=require("./auth/googleAuth");

//compilers

const compiler=require("./compiler/compiler");

//
mongoose.connect('mongodb://localhost/DoIT', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());
//

//auth

app.post("/login",(req,res)=>{
    if(req.body)
        login(req,res);
    else
        res.status(400).send("Request failed!");
});

app.post("/register",(req,res)=>{
    if(req.body)
        register(req,res);
    else
        res.status(400).send("Request failed!");
});

app.get('/confirmation/:email/:token',(req,res)=>{
    if(req.body)
        confirmation(req,res);
    else
        res.status(400).send("Request failed!");
});

app.post("/resend",(req,res)=>{
    if(req.body)
        resend(req,res);
    else
        res.status(400).send("Request failed!");
});

app.post("/resetpass",(req,res) => {
    if(req.body)
        resetPassword(req,res);
    else
        res.status(400).send("Request failed!");
});


app.post("/delete",(req, res)=>{
    if(req.body)
        deleteAccount(req,res);
    else
        res.status(400).send("Request failed!");
});

//compilers

app.post("/c",(req,res)=>{
    if(req.body)
        compiler(req,res,c,"c");
    else
        res.status(400).send("Request failed!");
});

app.post("/cpp",(req,res)=>{
    if(req.body)
        compiler(req,res,cpp,"cpp");
    else
        res.status(400).send("Request failed!");
});

app.post("/java",(req,res)=>{
    if(req.body)
        compiler(req,res,java,"java");
    else
        res.status(400).send("Request failed!");
});

app.post("/python",(req,res)=>{
    if(req.body)
        compiler(req,res,python,"python");
    else
        res.status(400).send("Request failed!");
});

app.post("/node",(req,res)=>{
    if(req.body)
        compiler(req,res,node,"node");
    else
        res.status(400).send("Request failed!");
});

//google oauth2

googleAuth();

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get("/auth/google/success",(req,res)=>{
    console.log(googleUser);
    res.status(200).send(googleUser);
});

app.get("/auth/google/error",(req,res)=>{
    res.status(400).send("Cannot log in with Google!");
});

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: '/error' }),(req,res)=>{
    res.redirect("/auth/google/success");
});

//port listener

app.listen(8081);