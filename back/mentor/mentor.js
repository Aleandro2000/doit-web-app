const pos=require("pos");
const chunker=require("pos-chunker");
const Dictionary=require("../models/dictionarySchema");

function strtok(src,delim)
{
    let delim_escaped=new RegExp('['+delim.replace(/[\[\]\(\)\*\+\?\.\\\^\$\|\#\-\{\}\/]/g, "\\$&")+']','g');
    return src.replace(delim_escaped,delim[0]).split(delim[0]);
}

function strstr(haystack, needle, before_needle)
{
    if(haystack.indexOf(needle)>=0) 
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
    let places=chunker.chunk(tags, '[{ tag: NNP|NNS|NN|JJ|VBG }]');
    let noums=[];
    strtok(places,"{}").forEach(element => {
        element=element.replace(/\s/g,"");
        if(strstr(element,"/NNP",true))
            noums.push(strstr(element,"/NNP",true));
        else if(strstr(element,"/NNS",true))
            noums.push(strstr(element,"/NNS",true));
        else if(strstr(element,"/NN",true))
            noums.push(strstr(element,"/NN",true));
        else if(strstr(element,"/JJ",true))
            noums.push(strstr(element,"/JJ",true));
        else if(strstr(element,"/VBG",true))
            noums.push(strstr(element,"/VBG",true));
    });
    if(!noums.length)
        return res.send({result: [{_id: null,keyword: "SORRY!",definition: "We may not find it!"}]});
    noums=Array.from(new Set(noums));
    Dictionary.find({},(err,dictionary)=>{
        if(err)
            return res.send({result: [{_id: null,keyword: "SORRY!",definition: "We may not find it!"}]});
        else if(dictionary)
        {
            let result=[];
            for(let element in dictionary)
                for(let index in noums)
                    if(dictionary[element].keyword==noums[index])
                    {
                        result.push(dictionary[element]);
                        break;
                    }
            if(result.length)
                return res.send({result: result});
            else
                return res.send({result: [{_id: null,keyword: "SORRY!",definition: "We may not find it!"}]});
        }
    });
}