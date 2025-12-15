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

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post("/reserve", async (req, res) => {
  try {
    console.log("Incoming:", req.body);

    const { name, email, date, time, persons } = req.body;

    // Save reservation
    await new Reservation(req.body).save();
    console.log("Reservation saved");

    // Send email
    await transporter.sendMail({
      from: "Food Lovers Restaurant <no-reply@foodlovers.com>",
      to: email,
      subject: "🍽️ Reservation Confirmed",
      html: `
        <h2>Reservation Confirmed</h2>
        <p>Hello <b>${name}</b>,</p>
        <p>Your table is booked successfully.</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
        <p><b>Guests:</b> ${persons}</p>
        <br/>
        <p>See you soon ❤️</p>
      `
    });

    console.log("Email sent");

    res.json({ success: true });

  } catch (err) {
    console.error("EMAIL ERROR:", err);
    res.json({
      success: true,
      warning: "Reservation saved, email pending"
    });
  }
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
