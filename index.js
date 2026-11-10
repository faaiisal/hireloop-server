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
const user = database.collection("user");
const job = database.collection("job");


app.get('/', (req, res) => {
  res.status(200).send('Hireloop server is running');
});

app.get('/user', async (req, res) => {
  const cursor = user.find({});
  const result = await cursor.toArray();
  res.send(result);


  fetch()


});

// jobs related APIS for new jobs 

app.post('/jobs', async(req, res) => {
  const job = req.body;
  const result = await jobs.insertOne(job);
  res.send(result);
})

app.listen(port, () => {
  console.log(`Hireloop server is running on port: ${port}`);
});