import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import habitRoutes from "./routes/habitRoutes.ts";
import recordRoutes from "./routes/recordRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/habit", habitRoutes);

app.use("/api/record", recordRoutes);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Server is running on port 5003");
});
