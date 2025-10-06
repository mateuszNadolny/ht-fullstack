import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import prisma from "./prismaClient.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  console.log("enpoint working ✅");
});

app.listen(PORT, () => {
  console.log("Server is running on port 5003");
});
