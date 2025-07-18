const nodemailer = require("nodemailer");
const africastalking = require("africastalking")({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

// EMAIL SETUP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendBookingEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `"Kenya Explorers" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", to);
  } catch (err) {
    console.error("❌ Email error:", err.message);
  }
};

exports.sendBookingSMS = async (phone, message) => {
  try {
    const result = await africastalking.SMS.send({
      to: [phone],
      message
    });
    console.log("✅ SMS sent to:", phone);
  } catch (err) {
    console.error("❌ SMS error:", err.message);
  }
};
