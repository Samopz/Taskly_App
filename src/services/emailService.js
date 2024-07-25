import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (recipient, username) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVICE, // smtp.gmail.com
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME, // sender gmail
      pass: process.env.MAIL_PASSWORD, // app password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: recipient,
    subject: "Happy Birthday!",
    html: `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Birthday Greeting</title>
                <style>
                  * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                  }
                  body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    background-color: #f4f4f4;
                  }

                  .main__container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    width: 100%;
                    border-radius: 8px;
                  }

                  .heading {
                    padding: 25px 0;
                    background-color: #007bff;
                    text-align: center;
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: bold;
                    border-radius: 8px 8px 0 0;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                  }

                  .message__container {
                    padding: 20px;
                    background-color: #ffffff;
                    color: #333333;
                    font-size: 1.05rem;
                    line-height: 1.5;
                    text-align: left;
                  }

                  .message__container p {
                    margin-bottom: 10px;
                  }

                  .footer__container {
                    padding: 20px;
                    font-size: 14px;
                    color: #777777;
                    text-align: center;
                  }
                </style>
              </head>
              <body>
                <div class="main__container">
                  <div class="heading">Happy Birthday!!! 🎉</div>

                  <div class="message__container">
                    <p>Dear ${username},</p>
                    <p>
                      Wishing you a day filled with happiness and a year filled with joy.
                      Happy birthday!
                    </p>
                    <p>
                      May your special day be packed with all the joy and blessings you can
                      imagine. Enjoy every moment to the fullest!
                    </p>
                    <p>Best wishes,</p>
                    <p style="margin: 0"><b>Josh</b>,<br />Jubilix</p>
                  </div>

                  <div class="footer__container">
                    <p>&copy; 2024 Samopz. All rights reserved.</p>
                  </div>
                </div>
              </body>
            </html>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${recipient}`);
  } catch (err) {
    console.error("Error sending email", err);
    throw new Error("Error sending email");
  }
};

export default sendEmail;
