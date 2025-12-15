import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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

app.post("/reserve", async (req, res) => {
  try {
    console.log("Incoming:", req.body);

    const reservation = new Reservation(req.body);
    await reservation.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
