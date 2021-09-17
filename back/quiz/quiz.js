const Quiz=require("../models/quizSchema");

module.exports=function(rq,res){
    switch(req.body.type)
    {
        case "logical":
            Quiz.find({type: req.body.type},(quizs,err)=>{
                if(err)
                    res.send({status: 400, msg: err.message});
                else
                    res.send({status: 200, result: quizes});
            });
            break;
        case "interview":
            Quiz.find({type: req.body.type},(quizs,err)=>{
                if(err)
                    res.send({status: 400, msg: err.message});
                else
                    res.send({status: 200, result: quizes});
            });
            break;
        default:
            res.send({status: 400, msg: "Request failed!"});
            break;
    }
}