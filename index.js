require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
const planetRoutes = require('./routes/planets');

const app = express();


app.use(express.json());


app.use(morgan('dev'));

app.use('/', planetRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
