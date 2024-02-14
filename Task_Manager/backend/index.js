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

mongoose.connect('mongodb://localhost:27017/mern_1')
    .then(() => {
        console.log('Connected to MongoDB!');
        })
    .catch((error) => {
        if (error) {
            console.log(error);
        }
    })
    
    /////////////////////INSERT NEW DATA TO MONGODB DATABASE///////////////
    app.get('/insert', (req, res) => {
        const user = new ChannelModel({
            id : 7,
            text : 'Nasta',
            day : 'hi11@gmail.com',
            reminder : true
        });
        user.save().then(()=>{
            res.send(`User ${user.text} has been added!`);
        }).catch((err)=>{
            console.log(err);
        })
    })

    //////////////////DELETE DATA FROM THE DATABASE///////////////////////////
    // app.get('/delete', () => {

    //     mongoose.connect('mongodb://localhost:27017/mern_1')
    // .then(() => {
    //     console.log('Connected to MongoDB!');
    //     })
    // .catch((error) => {
    //     if (error) {
    //         console.log(error);
    //     }
    // })
    //     try {
    //         // Delete documents that match a condition
    //         const deleteResult = ChannelModel.findByIdAndDelete(2);
    
    //         console.log(`${deleteResult.deletedCount} documents deleted`);
    //     } catch (error) {
    //         console.error('Error deleting data:', error);
    //     } finally {
    //         // Disconnect from MongoDB
    //         mongoose.disconnect();
    //     }
    // })

    ////////////////////READ DATA FROM MONGODB DATABASE//////////////////////
    app.get('/read', (req, res) => {
        ChannelModel.find().
        then(data => {return res.json(data);})
        .catch(err => {
            console.log(err);
        })
    })

    //////////STARTING THE SERVER/DEPLOYMENT//////////////////////
    app.listen(5051, () => {
        console.log('listing to port 5051');
    });
