const express = require('express');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/customer', authRoutes);

app.use('/', bookRoutes);

module.exports = app;