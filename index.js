const express = require('express');

require('dotenv').config();
const cors = require('cors')

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

app.use(express.static('public'));

// Routes
app.use('/api/fillings', require('./routes/fillings'));

app.listen(process.env.PORT, () => {
    console.info(`Server running on port ${ process.env.PORT }`);
})