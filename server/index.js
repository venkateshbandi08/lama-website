const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
};

connectMongoDB();

app.use("/api/auth", authRoutes);

app.get("/", async (req, res) => {
  return res.json({ msg: "ehllo", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
