const { listenerCount } = require("../models/questionSchema");
const Question=require("../models/questionSchema");

function sendQuiz(req,res)
{
    Question.find({type: req.body.type},(questions,err)=>{
        if(err)
            res.send({status: 400, msg: err.message});
        else
        {
            let result=new Set();
            while(result.size<process.env.QUSETIONS_NUM||result.size<questions.length)
                result.add(Math.floor(Math.random()*questions.length));
            result=Array.from(result,index=>questions[index]);
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