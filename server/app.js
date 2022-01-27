const express = require('express');
const db = require('./database');
const middlewares = require('./middlewares');
const router = require('./routes');
const appError = require('./utils/appError');

const app = express();

require('dotenv').config({ silent: true });

app.use(...middlewares);

router.registerApplicationRoutes(app);

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync with { force: true }');
});

app.all('*', (req, _, next) => {
    next(new appError(`Cannot find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
