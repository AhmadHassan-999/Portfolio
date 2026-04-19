// const nodemailer = require("nodemailer");

// exports.handler = async (event) => {
//     if (event.httpMethod !== "POST") {
//         return { statusCode: 405, body: "Method Not Allowed" };
//     }

//     const { name, email, phone, message } = JSON.parse(event.body);

//     let transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });

//     try {
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER,
//             subject: "Portfolio Message",
//             html: `
//                 <h3>New Message</h3>
//                 <p>Name: ${name}</p>
//                 <p>Email: ${email}</p>
//                 <p>Phone: ${phone}</p>
//                 <p>Message: ${message}</p>
//             `,
//         });

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ success: true }),
//         };

//     } catch (err) {
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ success: false }),
//         };
//     }
// };

const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { name, email, phone, message } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Portfolio Message",
            html: `
                <h3>New Message</h3>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Message: ${message}</p>
            `,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: err.message }),
        };
    }
};