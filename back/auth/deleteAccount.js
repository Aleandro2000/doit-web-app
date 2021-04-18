const User = require('./models/user');

module.exports = function(req, res, next) {
    if(req.session.user&&req.cookies.session)
        User.findByIdAndDelete(req.session.user._id, (err,result)=>{
            if(err)
                return res.sendStatus(500).send({msg: "Failed deleting account!"});
            res.clearCookie('session');
            return res.status(200).send({msg:"Succesful deleted account!"});
        });
    else
        res.redirect('/login');
}