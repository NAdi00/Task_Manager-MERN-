const express = require('express');
const cors = require('cors');
const bodyParser = require( "body-parser" );
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());

////////STARTING SERVER
app.listen(5051, () => {
    console.log('listing to port 5051');
});

// //URL
// const uri = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'mern_1';



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
    
/////////////////////INSERT NEW DATA TO MONGODB DATABASE///////////////
app.get('/insert', (req, res) => {
    const client = new MongoClient(uri);
    
    // Connect to the MongoDB server
    client.connect();

    console.log('Connected to MongoDB');

    // Access a database
    const database = client.db(dbName);

    // Access a collection
    const collection = database.collection('my_collection');

    // Insert a single document
    const singleInsertResult = collection.insertOne({ key: 2});

    console.log(`Inserted ${singleInsertResult.insertedCount} document`);

    // Insert multiple documents
    const multipleInsertResult = collection.insertMany([
            { key: 'value1' },
            { key: 'value2' }
    ]);

    console.log(`Inserted ${multipleInsertResult.insertedCount} documents`);
})
    
////////////////////READ DATA FROM MONGODB DATABASE//////////////////////
// app.get('/read', (req, res) => {
//     const client = new MongoClient(uri);

//     try {
//         // Connect to the MongoDB server
//         client.connect();

//         console.log('Connected to MongoDB');

//         // Access a database
//         const database = client.db(dbName);

//         // Access a collection
//         const collection = database.collection('my_collection');

//         // Find all documents in the collection
//         const cursor = collection.find();

//         // Iterate over the documents
//         cursor.forEach(document => {
//             console.log(document);
//         });

//         // Alternatively, you can use toArray() to retrieve all documents as an array
//         // const documentsArray = await cursor.toArray();
//         // console.log(documentsArray);

//         // Find a single document in the collection
//         const singleDocument = await collection.findOne({ /* Your query criteria */ });
//         console.log(singleDocument);

//     }
// })

//////////STARTING THE SERVER/DEPLOYMENT//////////////////////
