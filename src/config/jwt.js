// config/session.js
require("dotenv").config();

module.exports = {
    secret: process.env.TOKEN_SECRET || 'defaultSecretKey',
    expiresIn: process.env.TOKEN_EXPIRATION || '1h', 
};