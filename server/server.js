import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

const reservationSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  persons: Number,
  date: String,
  time: String,
  message: String
});

const Reservation = mongoose.model("Reservation", reservationSchema);

/* ================= EMAIL CONFIG ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ================= RESERVATION API ================= */
app.post("/reserve", async (req, res) => {
  try {
    console.log("Incoming:", req.body);

    const { name, email, contact, persons, date, time, message } = req.body;

    // Save to DB
    const reservation = new Reservation(req.body);
    await reservation.save();

    // Email content
    const mailOptions = {
      from: `"Food Lovers Restaurant" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🍽️ Table Reservation Confirmed",
      html: `
        <h2>Reservation Confirmed</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your table has been successfully booked.</p>
        <hr/>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Guests:</strong> ${persons}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
        <br/>
        <p>We look forward to serving you ❤️</p>
        <p><strong>Food Lovers Restaurant</strong></p>
      `
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", email);

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
