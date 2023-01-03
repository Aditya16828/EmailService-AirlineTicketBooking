const sender = require('../config/emailConfig');
const {NotificationTicketRepository} = require('../repository/index');

const nt = new NotificationTicketRepository();

/**
 * Since, emailing is not a very obvious, and even if have a little delay there is no problem, hence there is no point of putting all
 * the other services in waiting stage...
 */

const fetchPendingMails = async (filter) => {
    try {
        const tickets = await nt.getAllTickets(filter);
        return tickets;
    } catch (error) {
        console.log("Unable to fetch Tickets (service layer)");
        console.log(error);
        throw {error};
    }
}


const createTicket = async (data) => {
    try {
        const ticket = await nt.createTicket(data);
        return ticket;
    } catch (error) {
        console.log("Unable to create ticket");
        console.log(error);
        throw {error};
    }
}

const updateTicket = async (id, data) => {
    try {
        await nt.updateTicket(id, data);
    } catch (error) {
        console.log("Error in updating ticket (service layer)");
        console.log(error);
        throw {error};
    }
}

module.exports ={fetchPendingMails, createTicket, updateTicket};