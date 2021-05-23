const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require("cors");

const login=require("./auth/login");
const register=require("./auth/register");
const confirmation=require("./auth/confirmEmail");
const resend=require("./auth/resendLink");
const deleteAccount=require("./auth/deleteAccount");

mongoose.connect('mongodb://localhost/DoIT', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

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

app.get("/logout",(req, res)=>{
    logout(req,res);
});

app.get("/delete",(req, res)=>{
    deleteAccount(req,res);
});

app.listen(8081);