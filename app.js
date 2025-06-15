const express = require('express');
require('dotenv').config();
const db = require('./config/db.js');
const routes = require('./routes/router.js');
const cors = require("cors");


const port = process.env.PORT || 3000
const app = express();

app.use(cors())
app.use(express.json());
app.use(routes)

app.listen(port, () => {
    console.log(`server running, 127.0.0.1:${port}`);
})