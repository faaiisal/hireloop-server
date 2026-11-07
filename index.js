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

app.get('/', (req, res) => {
  res.status(200).send('Hireloop server is running');
});

app.listen(port, () => {
  console.log(`Hireloop server is running on port: ${port}`);
});