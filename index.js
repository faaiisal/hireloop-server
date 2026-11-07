import express from "express"; 
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

//middlewares

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Hireloop server is running');
});

app.listen(port, () => {
  console.log(`Hireloop server is running on port: ${port}`);
});