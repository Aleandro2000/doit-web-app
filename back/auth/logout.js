module.exports = function(req, res, next) {
    if(req.session.user&&req.cookies.session)
    {
        res.clearCookie('session');
        return res.status(200).send({msg:"Succesful logged out!"});
    }
    else
        res.redirect('/login');
}