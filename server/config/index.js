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
            password: process.env.DB_PASS || '12345678',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || '27017',
            dbname: process.env.DB_NAME || 'hr_management',
            dialect: process.env.DIALECT || 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        },
    },
    mail: {
        from: process.env.EMAIL_ADDRESS || 'hrmanagementtask@gmail.com',
        port: process.env.EMAIL_PORT || 587,
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        transport_method: process.env.EMAIL_TRANSPORT || 'SMTP',
        secure_connection: Boolean(process.env.EMAIL_TLS == 'true'),
        auth: {
            user: process.env.EMAIL_USER || 'hrmanagementtask@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'TestingNodeJs2021',
        },
    },
};
