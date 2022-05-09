require('dotenv').config()
const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const db = require('./models')
const Roles = db.role;
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });
var corsOption = {
    origin: 'http://localhost:' + process.env.PORT
}
 
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./router/auth.router')(app);
require('./router/user.router')(app);
// app.use('/api/user', user);

app.get('/', (req, res) => {
    res.json({
        code: 200,
        message: 'This API worked!'
    })
})

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

module.exports = app