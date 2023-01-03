const sender = require('../config/emailConfig');

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
    sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody
    });
}

/**
 * Since, emailing is not a very obvious, and even if have a little delay there is no problem, hence there is no point of putting all
 * the other services in waiting stage...
 */

module.exports ={sendBasicEmail};