const mongoose = require('mongoose');
const express = require('express');
/* const bodyParser = require("body-parser"); */
const ChannelModel = require('./modules/Channel')
const cors = require('cors');
const bodyParser = require( "body-parser" );

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Handle POST request//Receiving data from client/frontend
app.post('/fromFront', (req, res) => {
  const receivedData = req.body;
  res.send(receivedData);
});

app.get('/', async (req, res) => {
    res.status(201).send('<h1>Hello Node main page</h1>')
})

function InitialisingConnection() {
    mongoose.connect('mongodb://localhost:27017/mern_1')
    .then(() => {
        console.log('Connected to MongoDB!');
        })
    .catch((error) => {
        if (error) {
            console.log(error);
        }
    })
}
    
/////////////////////INSERT NEW DATA TO MONGODB DATABASE///////////////
app.get('/insert', (req, res) => {
    InitialisingConnection();
    const user = new ChannelModel({
        id : 5,
        text : 'Max',
        day : 'Maxflows@gmail.com',
            reminder : true
        });
        user.save().then(()=>{
            res.send(`User ${user.text} has been added!`);
        }).catch((err)=>{
            console.log(err);
        })
        ////close connetion  ---TO DO
    })
    
////////////////////READ DATA FROM MONGODB DATABASE//////////////////////
app.get('/read', (req, res) => {
    InitialisingConnection();
    ChannelModel.find().
        then(data => {return res.json(data);})
        .catch(err => {
            console.log(err);
    })
    ////CLOSE CONNECTION TO DO
})

//////////STARTING THE SERVER/DEPLOYMENT//////////////////////
app.listen(5051, () => {
    console.log('listing to port 5051');
});