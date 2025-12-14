import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const cors = require("cors");

app.use(cors({
  origin: "https://wonderful-monstera-5169be.netlify.app",
  methods: ["GET", "POST"],
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Schema
const ReservationSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    persons: Number,
    date: String,
    time: String,
    message: String
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

// Email transporter (Gmail)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API endpoint
app.post("/reserve", async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();

        // Send confirmation mail
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: "Your Table Reservation is Confirmed",
            html: `
                <h2>Hello ${req.body.name},</h2>
                <p>Your table has been successfully reserved!</p>
                <p><strong>Date:</strong> ${req.body.date}</p>
                <p><strong>Time:</strong> ${req.body.time}</p>
                <p><strong>Number of Persons:</strong> ${req.body.persons}</p>
                <p>We look forward to serving you.</p>
                <hr/>
                <p>Food Lovers Restaurant</p>
            `
        });

        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, error: err });
    }
});

app.listen(5001, () => console.log("Server running on port 5000"));
