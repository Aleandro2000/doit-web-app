module.exports = function(req,res,lang){
    lang.runSource(req.body.code, {stdin: req.body.input}).then(result => res.send(result));
}