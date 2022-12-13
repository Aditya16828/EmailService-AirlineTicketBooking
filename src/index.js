const express = require('express');

const {PORT} = require('./config/serverConfig.js');

const setupAndrunServer = async function (){
    const app = express();

    app.listen(PORT, function (){
        console.log("Server started at", PORT);
    });
};

setupAndrunServer();