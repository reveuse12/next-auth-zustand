import nodemailer from "nodemailer";
import brcrypt from "bcrypt";
import User from "@/models/user.model";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hased token
    const hashedToken = await brcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
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
            <title>Email Verification</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
               .email-container { width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
               .header { text-align: center; padding-bottom: 20px; }
               .content { padding: 20px; }
               .footer { text-align: center; padding-top: 20px; color: #888; }
               .btn { display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
               .btn:hover { background-color: #0056b3; }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <img src="${process.env.LOGO_URL}" alt="Logo" width="100">
                </div>
                <div class="content">
                    <p>Dear User,</p>
                    <p>Please click the button below to ${
                      emailType === "VERIFY"
                        ? "verify your email"
                        : "reset your password"
                    }:</p>
                    <a href="${
                      process.env.WEBSITE_DOMAIN
                    }/verifyemail?token=${hashedToken}" class="btn">${
        emailType === "VERIFY" ? "Verify Email" : "Reset Password"
      }</a>
                    <p>If you did not request this action, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Admin Dashbaords. All rights reserved.</p>
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
