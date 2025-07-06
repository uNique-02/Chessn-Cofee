import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-message", async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("🔔 Incoming message:", { name, email, subject, message });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📧 Sending via:", process.env.EMAIL_USER);

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New message: ${subject}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    });

    res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});
export default router;
