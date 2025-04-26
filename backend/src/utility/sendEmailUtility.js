const nodemailer = require('nodemailer');

const sendEmailUtility = async (emailTo, emailText, emailSubject) => {
    try {
        // 1. Create transporter
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Gmail SMTP server
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "mubin.creativecornersbd@gmail.com",     // 👉 Your Gmail address
                pass: "creative1234"          // 👉 Your Gmail App Password
            }
        });

        // 2. Send mail
        let info = await transporter.sendMail({
            from: '"Inventory Management System" mubin.creativecornersbd@gmail.com', // Sender name and email
            to: emailTo,              // Receiver's email
            subject: emailSubject,    // Subject line
            text: emailText           // Email body (plain text)
        });

        return { status: 200, message: "Email Sent Successfully", data: info };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Email Sending Failed", error: error.message };
    }
};

module.exports = sendEmailUtility;
