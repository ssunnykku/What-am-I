import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.get("/", (req, res, next) => {
  res.send("Team08 Backend");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*", credentials: true }));

app.listen(5001, () => console.log("✅ Listening to port 5001"));
