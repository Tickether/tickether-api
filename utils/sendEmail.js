import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: Number(process.env.MAIL_PORT),
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,   
            }
        });

        await transporter.sendMail({
            from: email,
            to: process.env.FROM,
            subject: subject,
            text: text
        });
        console.log('Email sent')
    } catch (err) {
        console.log('Email not sent')
        console.log(err)
    }
    
};