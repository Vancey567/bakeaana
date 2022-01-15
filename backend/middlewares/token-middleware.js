const jwt = require('jsonwebtoken');

function verifyTokenMiddleware(req, res, next) {
    if(req.headers.authorization !== undefined) { 
        let token = req.headers.authorization.split(" ")[1];
        // Verify the token
        jwt.verify(token, "secretkey", (err, userCred) => {
            if(err === null) {
                next();
            } else {
                res.status(401).send({message: "Invalid Token"});
            }
        })
    } else {
        res.status(403).send({ message: "Please authenticate yourself"});
    }
}

module.exports = verifyTokenMiddleware;



