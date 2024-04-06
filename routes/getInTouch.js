const express = require("express");
const router = express.Router();
const axios = require("axios");
const nodemailer = require("nodemailer");

router.use(express.json());
const fetchData = require("../middleware/getUser");

router.post("/mailMe", fetchData, async (req, res) => {
  const { name, email, subject, message, token } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
    );
    if (response.data.success) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: `${subject || "unknown reason"}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      };

      await transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({ message: "Message submitted successfully!" });
    } else {
      res.status(404).send({message:"bots not allowed"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
  }
});

router.post("/captchaVerify", fetchData, async (req, res) => {
  const { token } = req.body;
  res.status(200).send({ token: token, message: "works" });
});

module.exports = router;
