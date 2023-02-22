const db = require('../module/db');
const mailer = require('../module/mail');
const config = require('./../config/auth.config');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const login = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: 'User Not Found.' });
        };

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(404).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        };

        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // 24 jam
        });

        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
};

const register = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log(username);

    if (username == undefined || email == undefined || password == undefined) {
        res.status(500).send('tolong masukan parameter dengan benar username, email, password!');
    }

    User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8)
    }).then(user => {
        mailer.sendMail(email, 'Successfuly registerd', 'your account has saved in database!').catch(err => {
            res.send({ message: err.message });
        });
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            });
        } else {
            // user role = 1
            user.setRoles([1]).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
          }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

module.exports = {
    login,
    register
}