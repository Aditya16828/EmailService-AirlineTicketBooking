const cron= require('node-cron');
const {NotificationTicketService} = require('../services/index');
const sender = require('../config/emailConfig');



const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        console.log("Set Mails");
        const response = await NotificationTicketService.fetchPendingMails({status: "Pending"});
        response.forEach((mails) => {
            sender.sendMail({
                to: mails.recipientEmail,
                subject: mails.subject,
                text: mails.content
            }, async (err, data) => {
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                    await NotificationTicketService.updateTicket(mails.id, {status: "Success"});
                }
            });
        });
    });
}

module.exports = {setupJobs};