const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const compression = require('compression');

const morgan = require('morgan');
const globalErrorHandler = require('../controllers/handlers/errorController');

module.exports = [
    express.json({ limit: '2mb' }),
    express.urlencoded({ extended: true }),
    compression(),
    cors({
        origin: true,
        methods: ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: [
            'x-now-id',
            'x-now-trace',
            'x-powered-by',
            'Origin',
            'Accept',
            'Content-Type',
            'Set-Cookie',
            'Authorization',
        ],
        credentials: true,
    }),
    helmet(),
    morgan('tiny'),
    xss(),
    globalErrorHandler,
];
