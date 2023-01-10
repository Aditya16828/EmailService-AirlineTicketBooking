const amqplib = require("amqplib");
// const { NotificationTicketService } = require('../services/index');

const {MESSAGE_BROKER_URL, EXCHANGE_NAME} = require('../config/serverConfig');

const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, "direct", false);
        return channel;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const appQueue = await channel.assertQueue('QUEUE_NAME');
        channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);

        channel.consume(appQueue.queue, msg => {
            console.log("Received Data");
            console.log(msg.content.toString());

            const payload = JSON.parse(msg.content.toString());
            service(payload);
            
            channel.ack(msg);
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const publishMessage = async (channel, binding_key, msg) => {
    try {
        await channel.assertQueue('QUEUE_NAME');
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(msg));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}