const nodemailer = require('nodemailer');
const sendEmail = async function(option){

    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
      })

      const message = {
        from: process.env.SMTP_FROM_NAME,
        to: option.email,
        subject: option.subject,
        text: option.message
      }
      await transport.sendMail(message)
    
    
}


module.exports = sendEmail;