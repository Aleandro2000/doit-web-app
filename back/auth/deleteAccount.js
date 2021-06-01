const User = require('./models/user');

module.exports = function(req, res, next) {
    User.deleteOne({email: req.body.session}, (err,result)=>{
        if(err)
            return res.sendStatus(500).send({msg:"Failed deleting account!"});
        else
            return res.status(200).send({msg:"Succesful deleted account!"});
    });
}