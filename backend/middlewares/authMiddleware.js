const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).send("Access Token Required.");

    jwt.verify(token, process.env.JWT_SECRET, (err, message) => {
        if(err) return res.status(403).send("Invalid or Expired Token!");
        req.username = message.email;
        next();
    });
}
