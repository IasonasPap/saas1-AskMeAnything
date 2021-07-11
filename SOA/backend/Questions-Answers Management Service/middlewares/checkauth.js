axios = require('axios');

module.exports = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    //const body = req.body;
    if (!token){
        res.status(401).json({
            message: "Missing token!"
        });
    }
    else {
        axios({
            "url": "http://localhost:5003/esb/authorize",
            "method": "post",
            "headers": {'x-auth-token' : token}
            // "data": body
        })
            .then(resp => {
                //res.send(resp.data)
                next()
            })
            .catch(e => {
                res.status(401).json({
                    message: "A problem with authentication occured!"
                });
            });
    }
};