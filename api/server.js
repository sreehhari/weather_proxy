require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT | 3000;
const API_KEY = process.env.API_KEY;

app.get("/weather", async (req, res) => {
  const { city, country } = req.query;
  if (!city || !country) {
    return res.status(400).json({
      error: "missing city or country inputs",
    });
  }
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`,
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`the server is now running at ${PORT}`);
});
