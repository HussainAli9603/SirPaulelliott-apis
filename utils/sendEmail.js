import nodemailer from "nodemailer";

const sendMail = async (options) => {
    console.log(options)
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        secure:true,
        logger:true,
        secureConnection:false,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
        tls:{
            rejectUnauthorized:true
        }
    });

    // HTML Email Template
const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .email-container { font-family: Arial, sans-serif; color: #333; }
    .header { background-color: #007BFF; color: white; text-align: center; padding: 10px; }
    .content { margin: 20px 0; }
    .footer { font-size: 0.9em; text-align: center; color: #777; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome!</h1>
    </div>
    <div class="content">
      <p>${options.name}</p>
      <p>${options.emailBody}</p>
      <a href="${options.verificationLink}" style="color: #007BFF;">Click Here!</a>
    </div>
    <div class="footer">
      <p>&copy; 2024 Your Company</p>
    </div>
  </div>
</body>
</html>
`;

    const mailOptions = {
        // from: process.env.SMPT_MAIL,
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        // text: options.emailBody,
        html: emailHTML,
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;