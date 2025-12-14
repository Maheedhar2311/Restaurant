import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// CORS for Netlify frontend
app.use(cors({
  origin: "https://wonderful-monstera-5169be.netlify.app",
  methods: ["GET", "POST"],
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB Error:", err));

// Reservation Schema
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

// Reservation endpoint
app.post("/reserve", async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Table Reservation Confirmation",
      text: `Hello ${req.body.name}, your table has been successfully reserved!`
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Reservation saved & email sent" });

  } catch (error) {
    console.error("Reservation error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
