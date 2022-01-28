const express = require('express');
const db = require('./database');
const middlewares = require('./middlewares');
const router = require('./routes');
const appError = require('./utils/appError');
const _delete = require('./helpers/deleteFolderFiles');

const app = express();

require('dotenv').config({ silent: true });

app.use(...middlewares);

router.registerApplicationRoutes(app);

db.sequelize.sync().then(function () {
    console.log('DB connected!');
}, function (err) {
    console.log(err);
});



app.all('*', (req, _, next) => {
    next(new appError(`Cannot find ${req.originalUrl} on this server`, 404));
});

_delete.deleteImages();

module.exports = app;
