const mongoose = require('mongoose');
const express = require('express');
/* const bodyParser = require("body-parser"); */
const ChannelModel = require('./modules/Channel')
const cors = require('cors');
const bodyParser = require( "body-parser" );
const { MongoClient } = require('mongodb');

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
function closingConnection() {
    console.log('Remember to close connection');
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

    //////////////////DELETE DATA FROM THE DATABASE///////////////////////////
function deleting() {
    const uri = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'mern_1';
    const client = new MongoClient(uri);
    client.connect()
    .then('Mongodb connected not from mongoose')

    // Access a database
    const database = client.db(dbName);
    const collection = database.collection('my_collection');

    // Delete documents that match a condition
    const result = collection.deleteMany({ id:2});

    console.log(`${result.deletedCount} documents deleted`);
}


closeConnection();

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

