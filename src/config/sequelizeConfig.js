require('dotenv').config();
module.exports = {
    development: {
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DRIVER
    },
    test: {
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DRIVER
    },
    production: {
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DRIVER
    }
};