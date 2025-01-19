const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { OpenAI } = require("openai");

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// House routes
const houseRoutes = require("./routes/houses");
app.use("/api/houses", houseRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// House Model (ensure it's imported properly)
const House = require("./models/House");

// Endpoint for querying houses using natural language
app.post("/api/query", async (req, res) => {
  const { query } = req.body;

  try {
    // Step 1: Convert natural language to a database query
    const prompt = `Translate this natural language query into a MongoDB filter for house listings: "${query}"`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use a more recent model
      messages: [{ role: "user", content: prompt }],
    });

    const dbFilter = JSON.parse(completion.choices[0].message.content.trim());

    // Step 2: Query the database
    const results = await House.find(dbFilter).limit(4);

    res.json(results);
  } catch (err) {
    console.error("Error processing query:", err.message);
    res.status(500).json({ error: "Failed to process query" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
