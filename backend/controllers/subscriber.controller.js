import Subscriber from "../model/subscriber.model.js";

async function sendWelcomeEmail(email) {
  let transporter = nodemailer.createTransport({
    service: "gmail", // or use Mailgun, SendGrid etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"My Newsletter" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thanks for subscribing!",
    html: `<h1>Welcome!</h1><p>Thanks for subscribing to our newsletter.</p>`,
  });
}

export const createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Optional: send welcome email
    await sendWelcomeEmail(email);

    res.status(201).json({ message: "Subscribed successfully", newSubscriber });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already subscribed" });
    }
    res.status(500).json({ message: "Server error" });
  }
};
