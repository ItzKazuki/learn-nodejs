const db = require('../../module/db');
const jwt = require('jsonwebtoken');
const User = db.user;

exports.updateUsername = (req, res) => {
    const userName = jwt.decode(req.headers["x-access-token"]);

    User.findOne({
        where: {
            id: userName.id
        }
    }).then(user => {
        User.update(
            { username: req.body.username },
            { where: { id: user.id } }
        ).then(result => res.status(200).send({ message: 'sucess change username to ' +  req.body.username}));
    }).catch(err => {
        res.send({ message: err.message });
    });
}