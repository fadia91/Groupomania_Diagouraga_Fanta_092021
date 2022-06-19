const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const db = require("./models/Index.js");
db.sequelize.sync();

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');


app.use(bodyparser.json());
app.post("/user", (_req, _res) => {});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', userRoutes);
app.use('/api', postRoutes);


module.exports = app;
