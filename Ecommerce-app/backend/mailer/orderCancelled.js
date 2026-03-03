import nodemailer from "nodemailer";
export async function SendMailCancelledOrder(name, email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
      },
    });
    await transporter.sendMail({
      from: `Ecommerce Store <${process.env.MAILUSER}> `,
      to: email,
      subject: "Your Order Has Been Cancelled!",
      html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Cancel</title>

      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .email-header {
              background-color: #0d6efd;
              color: #ffffff;
              padding: 20px;
              text-align: center;
          }
          .email-body {
              padding: 20px;
              color: #333333;
              line-height: 1.6;
          }
          .email-body h2 {
              color: #0d6efd;
          }
          .email-footer {
              background-color: #f1f1f1;
              padding: 15px;
              text-align: center;
              color: #666666;
              font-size: 14px;
          }
      </style>
  </head>

  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Ecommerce Store</h1>
          </div>

          <div class="email-body">
              <h2>Your Order Has Been Cancelled</h2>

              <p>Dear <b>${name}</b>,</p>

              <p> your order has been being Cancelled .</p>

              <p>If you have any questions, our support team is always here to help.</p>

              <p>Thank you for choosing <strong>Ecommerce-Store</strong>!</p>
          </div>

          <div class="email-footer">
              &copy; ${new Date().getFullYear()} Ecommerce-Store. All rights reserved.
          </div>
      </div>
  </body>
  </html>
    `,
    });
    console.log("Email sent:");
  } catch (error) {
    console.log("Error:", error);
  }
}
