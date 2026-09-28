import nodemailer from "nodemailer";
//generated email template for verification email:

const verificationEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f5f7; color: #333333;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f5f7; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 36px 20px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">Blog App</h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 20px; font-weight: 600;">Welcome to the community! 🎉</h2>
              <p style="margin: 0 0 20px 0; color: #64748b; font-size: 15px; line-height: 1.6;">
                Thanks for getting started with Blog App! Please verify your email address by clicking the button below so you can access all features.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #4f46e5;">
                    <a href="https://yourdomain.com/verify?token=YOUR_TOKEN" target="_blank" style="display: inline-block; padding: 14px 28px; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 13px; line-height: 1.5;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #f8fafc; padding: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0 0 6px 0;">© 2026 Blog App. All rights reserved.</p>
              <p style="margin: 0;">Sent with ❤️ from Blog App</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`


// Create a transporter using SMTP
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export const sendVerificationMail = async (to: string[]): Promise<void> => {
    try {
  const info = await transporter.sendMail({
    from: '"Blog App" <your_mom@example.com>', // sender address
    to: to.join(", "), // list of recipients
    subject: "Hello There", // subject line
    text: "Hello There,\n\nPlease verify your email address by clicking the link below:\nhttps://example.com/verify\n\nIf you didn't create an account, you can safely ignore this email.\n\nBest regards,\nThe Blog App Team", // plain text body
    html: verificationEmailTemplate, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}