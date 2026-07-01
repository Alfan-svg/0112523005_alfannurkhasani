import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import mahasiswaRoutes from "./routes/mahasiswa.routes";
import prodiRoutes from "./routes/prodi.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
 
dotenv.config();

const app = express();
 
const frontendOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((value) => value.trim())
  : ["http://localhost:3000", "http://localhost:3002"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || frontendOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
 
app.use(express.json());
 
// Agar file di folder uploads bisa diakses oleh frontend
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
 
// Health check
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server Express.js berjalan" });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Server Express.js sehat" });
});
 
// Routes
app.use("/api/prodi", prodiRoutes);
app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
 
export default app;