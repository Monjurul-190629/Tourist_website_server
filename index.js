const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;



//// for middleware
app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5u6pxxs.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();



        /// create database
        const SpotCollection = client.db("SpotDB").collection('TouristSpot');



        /// post
        /// post
        app.post('/TouristSpots', async (req, res) => {
            const newSpot = req.body;
            console.log(newSpot)
            const result = await SpotCollection.insertOne(newSpot);
            res.send(result)
        })
        /// get data from database
        app.get('/TouristSpots', async (req, res) => {
            const cursor = SpotCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        //// FOR UPDATE
        app.get('/TouristSpots/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await SpotCollection.findOne(query)
            res.send(result)
        })
       
        app.put('/TouristSpots/:id', async(req, res) => {
            const id = req.params.id;
            const filter = { _id : new ObjectId(id) };
            const options = { upsert: true };
            const spot1 = req.body;
            const updateDoc = {
              $set: {
                image : spot1.image,
                tourist_spot_name : spot1.tourist_spot_name,
                country_name : spot1.country_name,
                average_cost : spot1.average_cost,
                travel_time : spot1.travel_time,
                location: spot1.location,
                short_description : spot1.short_description,
                seasonality : spot1.seasonality,
                total_visitors_per_year : spot1.total_visitors_per_year
              },
            };
            const result = await SpotCollection.updateOne(filter, updateDoc, options);
            res.send(result)
           })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Tourism site is appears now! ")
})


app.listen(port, () => {
    console.log("Ok I am now ok!")
})