const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token){
        res.status(401).json({
            message: "Missing token!"
        });
    }
    else {
        jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') {
                res.status(401).json({
                    message: "Session Expired!"
                });
            } else if (err) {
                res.status(401).json({
                    message: "Invalid token!"
                });
            }
            else if (!err) {
                const userId = decoded.userId;
                if (req.body.userId && req.body.userId !== userId) {
                    res.status(401).json({
                        message: "Invalid token!"
                    });
                } else {
                    next();
                }
            }
        });

    }
};
