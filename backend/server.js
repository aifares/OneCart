import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import travelRoutes from "./routes/travelRoutes.js";
import mongoose from "mongoose";
const uri =
  "mongodb+srv://testAccount:MongoDBTest@onetravel.xjdjam6.mongodb.net/?retryWrites=true&w=majority";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", travelRoutes);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

function connectDB() {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${uri}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}

connectDB();
app.listen(9000, () => {
  console.log(`Example app listening on port ${9000}`);
});
