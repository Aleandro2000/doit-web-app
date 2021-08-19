const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const mongoose=require('mongoose');
const cors=require("cors");
const {c, cpp, node, python, java}=require('compile-run');
require('dotenv').config();

//auth

const login=require("./auth/login");
const register=require("./auth/register");
const confirmation=require("./auth/confirmEmail");
const resend=require("./auth/resendLink");
const deleteAccount=require("./auth/deleteAccount");
const resetPassword=require("./auth/resetPassword");
const forgotPassword=require("./auth/forgotPassword");
const verificationKey=require("./auth/verificationKey");

//compilers

const compiler=require("./compiler/compiler");

//subscription

const subscription=require("./subscription/subscription");
const secure_subscription=require("./subscription/3DS_subscription");

//mentor

const mentor=require("./mentor/mentor");

//
mongoose.connect("mongodb://"+process.env.DB_HOST+"/"+process.env.DB_NAME, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
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

app.post("/forgotpass",(req,res) => {
    if(req.body)
        forgotPassword(req,res);
    else
        res.status(400).send("Request failed!");
});

app.post("/verificationkey",(req,res) => {
    if(req.body)
        verificationKey(req,res);
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

//subscription

app.post("/subscription",(req,res)=>{
    if(req.body)
        subscription(req,res);
    else
        res.status(400).send("Request failed!");
});

app.post("/3DS_subscription",(req,res)=>{
    if(req.body)
        secure_subscription(req,res);
    else
        res.status(400).send("Request failed!");
});

//mentor

app.post("/mentor",(req,res)=>{
    if(req.body)
        mentor(req,res);
    else
        res.status(400).send("Request failed!");
});

//port listener

app.listen(process.env.PORT);