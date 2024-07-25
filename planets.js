
import Joi from 'joi';


let planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

const getAll = (req, res) => {
  res.status(200).json(planets);
};

const getOneById = (req, res) => {
  const { id } = req.params;
  const planetId = parseInt(id, 10);
  const planet = planets.find((p) => p.id === planetId);
  if (planet) {
    res.status(200).json(planet);
  } else {
    res.status(404).json({ message: "Planet not found" });
  }
};

const create = (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { id, name } = req.body;
  const newPlanet = { id, name };
  planets.push(newPlanet);

  res.status(201).json({ message: "Planet created", newPlanet });
};

const updateById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const planetId = parseInt(id, 10);
  let planet = planets.find((p) => p.id === planetId);

  if (!planet) {
    return res.status(404).json({ message: "Planet not found" });
  }

  planet.name = name;
  res.status(200).json({ message: "Planet updated", planet });
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const planetId = parseInt(id, 10);
  planets = planets.filter((p) => p.id !== planetId);

  res.status(200).json({ message: "Planet deleted", planets });
};

export { getAll, getOneById, create, updateById, deleteById };