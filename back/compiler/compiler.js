module.exports = function(req,res,lang){
    lang.runSource(req.body.code).then(result => res.send(result));
}