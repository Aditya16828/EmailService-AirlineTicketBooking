const {NotificationTicketService} = require('../services/index');

const createTicket = async (req, res) => {
    try {
        const response = await NotificationTicketService.createTicket(req.body);
        return res.status(200).json({
            data:  response,
            success: true,
            message: "Successfully created Notification Ticket",
            err: {}
        });
    } catch (error) {
        console.log("Error in creating Notification Ticket (Controller)");
        console.log(error);
        return res.status(501).json({
            data: {},
            success: false,
            message: "Unable to create Notification Ticket",
            err: {}
        })
    }
}

module.exports = {createTicket};
