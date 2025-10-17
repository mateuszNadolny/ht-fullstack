import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import habitRoutes from "./routes/habitRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per 15 min
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable the X-RateLimit headers
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL but this will probably require update before deplyment
    credentials: true, // Allow cookies to be sent
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);

app.use("/api/habit", habitRoutes);

app.use("/api/record", recordRoutes);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Server is running on port 5003");
});
