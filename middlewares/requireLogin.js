/**
 * Created by Mitaka on 24-Oct-17.
 */
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({error: 'You must log in!'});
    }

    next();
};