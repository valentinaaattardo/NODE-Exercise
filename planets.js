const express = require("express");
const Joi = require("joi");
const router = express.Router();

let planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().min(1).required(),
});

router.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

router.get("/api/planets/:id", (req, res) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");
  res.status(200).json(planet);
});

router.post("/api/planets", (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { id, name } = req.body;
  const existingPlanet = planets.find((p) => p.id === id);
  if (existingPlanet)
    return res.status(400).send("Planet with this ID already exists");

  const newPlanet = { id, name };
  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created successfully" });
});

router.put("/api/planets/:id", (req, res) => {
  const { error } = planetSchema.validate({
    ...req.body,
    id: parseInt(req.params.id),
  });
  if (error) return res.status(400).send(error.details[0].message);

  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send("Planet not found");

  planet.name = req.body.name;
  res.status(200).json({ msg: "Planet updated successfully" });
});

router.delete("/api/planets/:id", (req, res) => {
  const planetIndex = planets.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (planetIndex === -1) return res.status(404).send("Planet not found");

  planets.splice(planetIndex, 1);
  res.status(200).json({ msg: "Planet deleted successfully" });
});

module.exports = router;
