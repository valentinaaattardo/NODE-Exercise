import express from "express";
import morgan from "morgan";
import "express-async-errors";
import dotenv from 'dotenv';
import Joi from 'joi';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

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

import * as planetsController from './controllers/planets.js';

app.get('/api/planets', planetsController.getAll)

app.get("/api/planets/:id", planetsController.getOneById);

let planetScheme = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
})

app.post('/api/planets', planetsController.create);

app.put('/api/planets/:id', planetsController.updateById );

app.delete('/api/planets/:id', planetsController.deleteById);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});