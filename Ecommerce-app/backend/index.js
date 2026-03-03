import express from "express";
import dotenv from "dotenv";
import Database from "./config/db.js";
import cors from "cors";
import path from "path";
import router from "./routes/app-routes.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();

Database();
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(router);

app.listen(PORT, () => {
  console.log(`App listen on ${PORT}`);
});
