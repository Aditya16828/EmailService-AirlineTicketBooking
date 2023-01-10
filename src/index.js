const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig.js');

const {createChannel} = require('./utils/messageQueues');
const NotificationController = require('./controllers/email-controller');
const cronJobs = require('./utils/jobs');


const setupAndrunServer = async function (){
    const app = express();

    app.listen(PORT, async function (){
        console.log("Server started at", PORT);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        // cronJobs.setupJobs();
        const channel = await createChannel();
        NotificationController.getFromQueue(channel);

        app.post('/v1/api/createTicket', NotificationController.createTicket);
    });
};

setupAndrunServer();