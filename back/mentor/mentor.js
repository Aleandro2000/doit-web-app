const Dictionary=require("../models/dictionarySchema");
const pos=require("pos");
const chunker=require("pos-chunker");

function strtok(src,delim)
{
    let delim_escaped=new RegExp('[' + delim.replace(/[\[\]\(\)\*\+\?\.\\\^\$\|\#\-\{\}\/]/g, "\\$&") + ']', 'g');
    return src.replace(delim_escaped, delim[0]).split(delim[0]);
}

function strstr(haystack, needle, before_needle)
{
    if(haystack.indexOf(needle) >= 0) 
        return before_needle ? haystack.substr(0, haystack.indexOf(needle)) 
               : haystack.substr(haystack.indexOf(needle));
    return false;
}

module.exports=function(req,res){
    let words=new pos.Lexer().lex(req.body.search);
    let tags=new pos.Tagger()
        .tag(words)
        .map(function(tag){return tag[0] + '/' + tag[1];})
        .join(' ');
    let places=chunker.chunk(tags, '[{ tag: NNP }]');
    strtok(places,"{}").forEach(element => {
        if(strstr(element,"/NNP",true))
            console.log(strstr(element,"/NNP",true))
    });
    Dictionary.findOne({keyword: req.body.search},(dictionary,err)=>{
        if(err)
            return res.send({status: 500, msg: err.message});
        else if(!dictionary)
            return res.send({status: 500, msg: "Sorry! We may not find it!"});
        else
        return res.send({status: 200, result: dictionary.definition});
    });
}