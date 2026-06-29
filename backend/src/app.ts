import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import mahasiswaRoutes from "./routes/mahasiswa.routes";
import prodiRoutes from "./routes/prodi.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
 
const app = express();
 
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
 
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