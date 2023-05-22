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
        dialect: process.env.DB_TEST_DRIVER,
        storage: process.env.DB_TEST_STORAGE,
    },
    production: {
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DRIVER
    }
};