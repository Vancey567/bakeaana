function admin(req, res, next) {
    console.log(req.body);
    
    // if(req.body.role === 'admin') {
    //     return next();
    // }
    // return res.json({message: "You are not authorized to access this route"});
}

module.exports = admin;