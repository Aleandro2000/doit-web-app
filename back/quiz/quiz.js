const Question=require("../models/questionSchema");

module.exports=function(req,res){
    Question.find({isEnabled: true,type: req.body.type},(err,questions)=>{
        if(err)
            res.send({status: 400, msg: err.message});
        else if(!questions)
            res.send({status: 400, msg: "Request failed!"});
        else
        {
            let result=new Set();
            while(result.size<process.env.QUSETIONS_NUM||result.size<questions.length)
                result.add(Math.floor(Math.random()*questions.length));
            result=Array.from(result,index=>questions[index]);
            if(result.length)
                res.send({status: 200, result: result});
            else
                res.send({status: 400, msg: "Request failed!"});
        }
    });
}