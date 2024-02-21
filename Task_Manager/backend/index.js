const mongoose = require('mongoose');
const express = require('express');
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
    InitialisingConnection()
  const receivedData = req.body;
  res.json(req.body);
  console.log(req.body, 'yellow');
  ////Update data in databse
  UpdateDataInDatabase(receivedData);
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

////////////////////READ DATA FROM MONGODB DATABASE//////////////////////
app.get('/read', (req, res) => {
    InitialisingConnection();
    ChannelModel.find().
        then(data => {return res.json(data);})
        .catch(err => {
            console.log(err);
    })
    setTimeout(() => {
        mongoose.connection.close();
        console.log('closed');
    }, 1000);
})

app.get('/insert', (req, res) => {
    InitialisingConnection();
    const dataToInsert = new ChannelModel({
        text: 'Hello again on htttp error',
        day: 'today',
        reminder: true
    })
    dataToInsert.save().then(()=>{
        res.send(`User ${dataToInsert.text} has been added!`);
    }).catch((err)=>{
        console.log(err);
    })
});

/////This function will sync data sent by frontend and data in the database
function UpdateDataInDatabase(myInputs) {
    //////Compare data from frontend(myInpputs) and last update from mongodb(data)
    ChannelModel.find().
        then(data => {
            //////////////////////////MAIN FUNCTION/////////////////////
            for (const i of myInputs) {
                if (!data.includes(i)) {
                    const user = new ChannelModel({
                        text : i.text,
                        day : i.day,
                            reminder : true
                        });
                        user.save().then(()=>{
                            res.send(`User ${user.text} has been added!`);
                        }).catch((err)=>{
                            console.log(err);
                        })
                }
            }
            for (const j of data) {
                if (!myInputs.includes(j)) {
                    ChannelModel.findByIdAndDelete(j._id, (err, deletedDocument) => {
                        if (err) {
                          console.error('Error deleting document:', err);
                          return;
                        }
                        if (!j._id) {
                          console.log('Document not found');
                          return;
                        }
                        console.log('Document deleted:', deletedDocument);
                    })
                }
            }
            setTimeout(() => {
                mongoose.connection.close();
                console.log('closed');
            }, 5000);
        })
        .catch(err => {
            console.log(err);
    })
}

//////////STARTING THE SERVER/DEPLOYMENT//////////////////////
app.listen(5051, () => {
    console.log('listing to port 5051');
});