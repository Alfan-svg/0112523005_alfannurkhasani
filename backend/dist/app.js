"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mahasiswa_routes_1 = __importDefault(require("./routes/mahasiswa.routes"));
const prodi_routes_1 = __importDefault(require("./routes/prodi.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:3000";
app.use((0, cors_1.default)({
    origin: frontendOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
// Agar file di folder uploads bisa diakses oleh frontend
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// Health check
app.get("/", (req, res) => {
    res.json({ message: "Server Express.js berjalan" });
});
app.get("/health", (req, res) => {
    res.json({ message: "Server Express.js sehat" });
});
// Routes
app.use("/api/prodi", prodi_routes_1.default);
app.use("/api/mahasiswa", mahasiswa_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/user", user_routes_1.default);
exports.default = app;
