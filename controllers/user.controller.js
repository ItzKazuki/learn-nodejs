const db = require('../module/db');
const jwt = require('jsonwebtoken');
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
exports.userProfile = (req, res) => {
    const userName = jwt.decode(req.headers["x-access-token"]);
    User.findOne({
        where: {
            id: userName.id
        }
    }).then(user => {
        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            // let dateTime = new Date(user.createdAt);
            // dateTime.toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'})
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                created_at: user.createdAt,
                update_at: user.updatedAt
            });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};