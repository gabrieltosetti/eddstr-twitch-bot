const express = require('express');
const app = express();
const db = require('./config/db');
// const mongoose = require('mongoose');

const PORT = process.env.PORT || 80;

const authRoute = require('./routes/auth');

app.use('/api/user', authRoute);

app.listen(PORT, () => console.log('Server Up and running'));