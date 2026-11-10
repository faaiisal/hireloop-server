import express from "express"; 
import cors from "cors";
import 'dotenv/config';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 8000;

//middlewares

app.use(express.json());
app.use(cors());

//mongodb connection
const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ylwazzi.mongodb.net/`
);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB();
const database = connectedClient.db("hireloop");
const userCollection = database.collection("user");
const jobsCollection = database.collection("jobs");


app.get('/', (req, res) => {
  res.status(200).send('Hireloop server is running');
});

app.get('/user', async (req, res) => {
  const cursor = userCollection.find({});
  const result = await cursor.toArray();
  res.send(result);
});

// jobs related APIS for new jobs 

// job get API
app.get('/jobs', async (req, res) => {
  const cursor = jobsCollection.find({});
  const result = await cursor.toArray();
  res.send(result);
});
// job post API
app.post('/jobs', async(req, res) => {
  const newJob = req.body;
  const result = await jobsCollection.insertOne(newJob);
  res.send(result);
})

app.listen(port, () => {
  console.log(`Hireloop server is running on port: ${port}`);
});