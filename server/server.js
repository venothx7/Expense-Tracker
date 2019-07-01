const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 3000;

// Bdy parser Middleware
app.use(bodyParser.json());
app.use(cors());


// Connecting to mlabs/Mongo
const db = "mongodb://admin:admin12@ds245387.mlab.com:45387/expensedb";
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// anythin with /api url goes to api.js
const api = require('./routes/api');
app.use('/api', api);

app.get('/', function(req, res) {
    res.send('Hello from mongo server')
});

app.listen(port, () => console.log(`Server running on localhost: ${port}`));