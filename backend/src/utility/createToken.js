const jwt = require('jsonwebtoken');

const createToken = async (data) => {
    let payload = { exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), data };
    return await jwt.sign(payload, process.env.JWT_SECRET);
    };

    module.exports = createToken;