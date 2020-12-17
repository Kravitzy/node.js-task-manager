
const sgMail = require('@sendgrid/mail')

const sendGridAPIKEY = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendGridAPIKEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kravitzy@gmail.com',
        subject: 'thanks for joining in',
        text: `Welcome to the task manager app, ${name}. Hope you enjoy it!`
    })
}

const sendCancalationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kravitzy@gmail.com',
        subject: 'Sorry to see you go',
        text: `Goodbye ${name}. Hope to see you again soon!`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancalationEmail
}