const jwt = require('jsonwebtoken');
const TOKEN_SECRET = '*****';
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["auth-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET); 
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

module.exports = verifyToken;
