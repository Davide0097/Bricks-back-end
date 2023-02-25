// Imports:
// Express
// Mongoose
// Cors
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

//Dotenv
require('dotenv').config()

// Express json, Returns middleware that only parses json and only looks 
// at requests where the Content-Type header matches the type option.
app.use(express.json())

// Importing routes
const submissionsRoutes = require('./Routes/submissions')
const userRoutes = require('./Routes/user')

app.use('/api/user', userRoutes)
app.use('/api/submissions', submissionsRoutes)

// Middleware for testing purpose
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Using the default port for render hosting and if I don't have it I use port 4000
const PORT = process.env.PORT || process.env.SECRET_PORT;


//Listener and conncetion to mongoDB online cluster
mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("!!! SUCCESSFULLY CONNECTED TO MONGO DB ONLINE CLUSTER AND SERVER IS LISTENING ON PORT " + PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })




