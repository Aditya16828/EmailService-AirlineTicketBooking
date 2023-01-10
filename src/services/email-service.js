const sender = require('../config/emailConfig');
const {EMAIL_ID, BINDING_KEY} = require('../config/serverConfig');
const {NotificationTicketRepository} = require('../repository/index');
const {createChannel, subscribeMessage} = require('../utils/messageQueues');

const nt = new NotificationTicketRepository();

/**
 * Since, emailing is not a very obvious, and even if have a little delay there is no problem;
 * hence there is no point of putting all
 * the other services in waiting stage...
 */

const sendBasicEMail = async (from, recipient, subject, body) => {
    try {
        const response = await sender.sendMail({
            from: (from +`<${EMAIL_ID}>`),
            to: recipient,
            subject: subject,
            text: body
        });
        return {...response, message: "Mail Sent successfully"};
    } catch (error) {
        console.log("Unable to send Basic mail to ", recipient);
        console.log(error);
        throw error;
    }
}

const fetchPendingMails = async (filter) => { // used in cron jobs to fetch "Pending" mails
    try {
        const tickets = await nt.getAllTickets(filter);
        return tickets;
    } catch (error) {
        console.log("Unable to fetch Tickets (service layer)");
        console.log(error);
        throw error;
    }
}


const createTicket = async (data) => {
    try {
        const ticket = await nt.createTicket(data);
        return ticket;
    } catch (error) {
        console.log("Unable to create ticket");
        console.log(error);
        throw error;
    }
}

const updateTicket = async (id, data) => { // used in cron jobs to update the status to "Success"
    try {
        await nt.updateTicket(id, data);
    } catch (error) {
        console.log("Error in updating ticket (service layer)");
        console.log(error);
        throw error;
    }
}

const subscribeEvent = async (payload) => {
    const command = payload.command;
    const data = payload.data;

    if(command == 'sendMail'){
        sendBasicEMail(data.from, data.recipient, data.subject, data.body);
    } else if (command == 'setReminder'){
        createTicket(data);
    }
}

const getFromQueue = async (channel) => {
    try {
        await subscribeMessage(channel, subscribeEvent, BINDING_KEY);
    } catch (error) {
        throw error;
    }
}

module.exports ={
    fetchPendingMails,
    createTicket,
    updateTicket,
    sendBasicEMail,
    getFromQueue
};