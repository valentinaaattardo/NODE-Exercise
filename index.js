require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
require("express-async-errors");

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/planets", (req, res) => {
  res.json(planets);
});

app.get("/planets/:id", (req, res) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");
  res.json(planet);
});

app.post("/planets", (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) return res.status(400).send("Missing id or name");
  const newPlanet = { id, name };
  planets.push(newPlanet);
  res.status(201).json(newPlanet);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
