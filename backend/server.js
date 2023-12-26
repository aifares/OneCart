import express from "express";
import cors from "cors";
import travelRoutes from "./routes/travelRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", travelRoutes);

app.listen(9000, () => {
  console.log(`Example app listening on port ${9000}`);
});
