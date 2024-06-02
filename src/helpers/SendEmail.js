import nodemailer from "nodemailer";
import User from "@/models/user.model";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hased token
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: code,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: code,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: `${process.env.MAIL_ID}`,
        pass: `${process.env.MAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: "Admin-Dashboard",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${
              emailType === "VERIFY"
                ? "Verify Your Email"
                : "Reset Your Password"
            }</title>
            <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
                .email-container {
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  max-width: 600px;
                  margin: auto;
                  text-align: center;
                }
                .header {
                  margin-bottom: 20px;
                }
                .header img {
                  max-width: 150px;
                }
                .content {
                  font-size: 16px;
                  color: #333333;
                }
                .content p {
                  margin: 20px 0;
                }
                .btn {
                  background-color: #007bff;
                  color: #ffffff;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  display: inline-block;
                  margin: 20px 0;
                }
                .btn:hover {
                  background-color: #0056b3;
                }
                .footer {
                  margin-top: 20px;
                  font-size: 14px;
                  color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <img src="${process.env.LOGO_URL}" alt="Logo">
                </div>
                <div class="content">
                    <p>Dear User,</p>
                    <p>Please click the button below to ${
                      emailType === "VERIFY"
                        ? "verify your email"
                        : "reset your password"
                    }:</p>
                    <a href="${process.env.WEBSITE_DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "reset-password"
      }/${code}" class="btn">${
        emailType === "VERIFY" ? "Verify Email" : "Reset Password"
      }</a>
                    <p>If you did not request this action, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Admin Dashboards. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
