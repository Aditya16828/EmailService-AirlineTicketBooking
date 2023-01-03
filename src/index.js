const express = require('express');
const cron = require('node-cron');

const {PORT} = require('./config/serverConfig.js');

// const {sendBasicEmail} = require('./services/email-service');


const setupAndrunServer = async function (){
    const app = express();

    app.listen(PORT, function (){
        console.log("Server started at", PORT);

        // sendBasicEmail(
        //     'support@flightservice.com',
        //     'aditya.airlineserviceproject@gmail.com',
        //     'Testing Mail',
        //     'Hello Aditya'
        // );

        // cron.schedule('*/1 * * * *', () => {
        //     console.log('running a task every one minute');
        // });
    });
};

setupAndrunServer();