const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gp7ekja.mongodb.net/?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const projectsCollection = client.db("mahadi-portfolio").collection("projects");

    app.get('/projects', async (req, res) => {
        const query = {};
        const result = await projectsCollection.find(query).toArray();
        res.send(result);
    })

    app.get('/projects/:id', async (req, res) => {
        const id = req.params.id;
        const query = { projectId: id };
        const project = await projectsCollection.findOne(query);
        res.send(project);
    })
}

run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Mahadi-Portfolio server is running')
})

app.listen(port, () => {
    console.log(`Mahadi-Portfolio server is running on port: ${port}`);
})