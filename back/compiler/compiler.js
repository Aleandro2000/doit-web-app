module.exports = function(req,res,lang,type){
    let safe=false;
    switch(type)
    {
        case "c":
            safe=!req.body.code.toLowerCase().includes("sys")&&!req.body.code.toLowerCase().includes("exec")&&!req.body.code.toLowerCase().includes("process")&&!req.body.code.toLowerCase().includes("socket")&&!req.body.code.toLowerCase().includes("tempfile")&&!req.body.code.toLowerCase().includes("file")&&!req.body.code.toLowerCase().includes("remove")&&!req.body.code.toLowerCase().includes("rename")&&!req.body.code.toLowerCase().includes("thread")&&!req.body.code.toLowerCase().includes("uistd");
            break;
        case "cpp":
            safe=!req.body.code.toLowerCase().includes("sys")&&!req.body.code.toLowerCase().includes("exec")&&!req.body.code.toLowerCase().includes("process")&&!req.body.code.toLowerCase().includes("socket")&&!req.body.code.toLowerCase().includes("tempfile")&&!req.body.code.toLowerCase().includes("fstream")&&!req.body.code.toLowerCase().includes("remove")&&!req.body.code.toLowerCase().includes("rename")&&!req.body.code.toLowerCase().includes("thread")&&!req.body.code.toLowerCase().includes("uistd");
            break;
        case "java":
            safe=!req.body.code.toLowerCase().includes("runtime")&&!req.body.code.toLowerCase().includes("exec")&&!req.body.code.toLowerCase().includes("process")&&!req.body.code.toLowerCase().includes("socket")&&!req.body.code.toLowerCase().includes("tempfile")&&!req.body.code.toLowerCase().includes("thread");
            break;
        case "python":
            safe=!req.body.code.toLowerCase().includes("os")&&!req.body.code.toLowerCase().includes("exec")&&!req.body.code.toLowerCase().includes("process")&&!req.body.code.toLowerCase().includes("socket")&&!req.body.code.toLowerCase().includes("tempfile")&&!req.body.code.toLowerCase().includes("sys")&&!req.body.code.toLowerCase().includes("thread");
            break;
        case "node":
            safe=!req.body.code.toLowerCase().includes("process")&&!req.body.code.toLowerCase().includes("socket")&&!req.body.code.toLowerCase().includes("tempfile")&&!req.body.code.toLowerCase().includes("thread");
            break;
        default:
            break;
    }
    if(safe)
        lang.runSource(req.body.code, {stdin: req.body.input}).then(result => res.send(result));
    else
        res.send({stderr: "Error to compile the code!"});
}