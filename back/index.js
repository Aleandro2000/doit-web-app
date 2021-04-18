const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const morgan=require('morgan');

const login=require("./auth/login");
const register=require("./auth/register");
const confirmation=require("./auth/confirmEmail");
const resend=require("./auth/resendLink");
const logout=require("./auth/logout");
const deleteAccount=require("./auth/deleteAccount");

mongoose.connect('mongodb://localhost/DoIT');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'session',
    secret: 'DoITAuthSessionSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 3600000
    }
}));
app.use((req,res,next)=>{
    if(req.cookies.session&&!req.session.user)
        res.clearCookie('session');
    next();
});

app.get("/login",(req,res)=>{
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

app.get("/account/delete",(req, res)=>{
    deleteAccount(req,res);
});

app.listen(3000);