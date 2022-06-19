const jwt = require('jsonwebtoken');
require('dotenv').config();

const authAdmin = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(accessToken, `${process.env.SECRET_KEY}`);
        const is_admin = decodedToken.is_admin;
        if (is_admin !== true) {
            throw 'réservé aux admins';
        } else {
            next();
        }
    } catch {
        res.status(401).json({ error });
    }
};
module.exports = authAdmin;