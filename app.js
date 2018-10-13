const express = require("express");
const path =  require("path");
const bodyParser = require("body-parser");
const cors =  require("cors");
const passport = require("passport");
const mongoose =  require("mongoose");
const config = require("./config/database");

const app = express();
const users = require('./routes/users');

//Port Number
const port = 3000;

//Connection To Database
mongoose.connect(config.database, {useNewUrlParser: true});

//On Connection
mongoose.connection.on('connected', () => {
    console.log("Connected to Mongoose! database " + config.database);
});

//On Error Connection
mongoose.connection.on('error', (errMsg) => {
    console.log("Error Connecting to Mongoose! database " + errMsg);
});
//CORS Middleware
app.use(cors());

//Client Side Angular Mapping
app.use(express.static(path.join(__dirname, 'client')));

//Body pareser Middleware
app.use(bodyParser.json());

app.use('/users', users);

//Index Route
app.get('/', (req,res) =>{
    res.send("Endpoint");
})

//Server Start
app.listen(port, ()=>{
    console.log("Server started on port: " + port);
})