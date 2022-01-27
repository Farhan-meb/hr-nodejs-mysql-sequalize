module.exports = {
    app: {
        name: 'HR_Management',
        env: process.env.APP_ENV || 'development',
        secret: process.env.APP_SECRET || 'verysecretkey',
        port: process.env.APP_PORT || '4000',
        domain: process.env.APP_DOMAIN || 'http://localhost',
    },
    db: {
        mysql: {
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || '27017',
            dbname: process.env.DB_NAME || 'HR_Management',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        },
        mongo: {
            username: process.env.DB_USER || '',
            password: process.env.DB_PASS || '',
            port: process.env.DB_PORT || '27017',
            host: process.env.DB_HOST || 'localhost',
            dbname: process.env.DB_NAME || 'HR_Management',
            ip: process.env.MONGO_IP || 'mongo',
        },
    },
    mail: {
        from: process.env.EMAIL_ADDRESS || 'farhan@example.com',
        port: process.env.EMAIL_PORT || '1025',
        host: process.env.EMAIL_HOST || 'localhost',
        transport_method: process.env.EMAIL_TRANSPORT || 'SMTP',
        secure_connection: Boolean(process.env.EMAIL_TLS == 'true'),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    },
};
