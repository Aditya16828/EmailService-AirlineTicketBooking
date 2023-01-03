const { NotificationTicket } = require('../models/index');
const {Op} = require('sequelize');

class TicketRepository{
    async getAllTickets(filter){
        try {
            const tickets = await NotificationTicket.findAll({where: {
                status: filter.status,
                notificationTime: {
                    [Op.lte]: new Date()
                }
            }});
            return tickets;
        } catch (error) {
            console.log("Not able to fetch Ticket");
            console.log(error);
            throw {error};
        }
    }

    async getTicket(id){}

    async removeTicket(){
        try {
            await NotificationTicket.destroy({where: {status: "Success"}});
        } catch (error) {
            
        }
    }

    async createTicket(data){
        try {
            const ticket = await NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            console.log("Error in creating ticket");
            console.log(error);
            throw {error};
        }
    }

    async updateTicket(id, data){
        try {
            await NotificationTicket.update(data, {where: {id: id}});
        } catch (error) {
            console.log("Error in updating Ticket");
            console.log(error);
            throw {error};
        }
    }
}

module.exports = TicketRepository;