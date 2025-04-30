

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['token']; //getting the token from the header

    jwt.verify(token, "jwtkey1234", (err, decoded) => {
        if (err) {
            console.error(err); // log the error
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            //console.log(decoded['data']); //getting the decoded token
            req.headers.email = decoded['data'].email; //getting the email from the token
            next();
        }
    })
}