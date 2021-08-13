const express = require('express');
const app = express();
const db = require('./config/db');
// const mongoose = require('mongoose');

const PORT = process.env.SERVER_PORT || 80;

/* 
        MIDDLEWARES
*/
app.use(express.json());

const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);


app.listen(PORT, () => console.log(`Server Up and running on ${PORT}`));