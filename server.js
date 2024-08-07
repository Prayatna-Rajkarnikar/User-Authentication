import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnect } from "./mongo/dbConnection.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(morgan("combined"));

import authRoutes from "./routes/authRoutes.js";
dbConnect();

app.use("/userAuth", authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server Connected Successfully in PORT ${process.env.PORT}`);
});
