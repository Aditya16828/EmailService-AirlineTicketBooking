const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    BINDING_KEY: process.env.BINDING_KEY,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL
};