const db = require('./module/db');

const Roles = db.role;
    db.sequelize.sync({force: true}).then(() => {
        res.status(200).send('Drop and Resync Db Success!');
        initial();
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

function initial() {
    Roles.create({
        id: 1,
        name: 'user'
    });

    Roles.create({
        id: 2,
        name: 'moderator'
    });

    Roles.create({
        id: 3,
        name: 'admin'
    });
}