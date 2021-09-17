const { listenerCount } = require("../models/quizSchema");
const Quiz=require("../models/quizSchema");

function sendQuiz(req,res)
{
    Quiz.find({type: req.body.type},(quizs,err)=>{
        if(err)
            res.send({status: 400, msg: err.message});
        else
        {
            let result=new Set();
            while(result.size<process.env.QUIZES_NUM||result.size<quizes.length)
                result.add(Math.floor(Math.random()*quizes.length));
            result=Array.from(result,index=>quizes[index]);
            res.send({status: 200, result: result});
        }
    });
}

module.exports=function(req,res){
    switch(req.body.type)
    {
        case "logical":
            sendQuiz(req,res);
            break;
        case "interview":
            sendQuiz(req,res);
            break;
        default:
            res.send({status: 400, msg: "Request failed!"});
            break;
    }
}