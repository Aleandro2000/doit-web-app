const Dictionary=require("../models/dictionarySchema");

module.exports=function(req,res){
    let result=[];
    for(let i=0;i<req.body.search.length;++i)
        Dictionary.findOne({keyword: req.body.search[i]},(dictionary,err)=>{
            if(err)
                return res.send({status: 500, msg: err.message});
            else if(!dictionary)
                return res.send({status: 500, msg: "Sorry! We may not find it!"});
            else
                result.push(dictionary.definition);
        });
    if(result)
        return res.send({status: 200, result: result});
    else
        return res.send({status: 500, msg: "Sorry! We may not find it!"});
}