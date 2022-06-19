const authUserToken = require('../middleware/authUser');
module.exports = (req, res, next) => {
    const userId = req.body.userId;
    const reqAuthoriztion = req.headers.authorization;
    try {
        if (!reqAuthoriztion) throw new Error("Problème auth");
        if (userId && userId !== authUserToken(req)) throw new Error("id invalide");

        next();
    } catch (error) { res.status(401).json({ error});
    }
};
