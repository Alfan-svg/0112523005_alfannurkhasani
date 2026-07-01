"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const database_1 = __importDefault(require("../config/database"));
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email dan password wajib diisi",
            });
        }
        const [rows] = await database_1.default.query("SELECT id, email, nama, role FROM users WHERE email = ? AND password = ?", [email, password]);
        if (rows.length === 0) {
            return res.status(401).json({
                message: "Email atau password salah",
            });
        }
        const user = rows[0];
        res.json({
            message: "Login berhasil",
            data: {
                id: user.id,
                email: user.email,
                nama: user.nama,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { email, password, nama } = req.body;
        if (!email || !password || !nama) {
            return res.status(400).json({
                message: "Email, password, dan nama wajib diisi",
            });
        }
        const [existing] = await database_1.default.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }
        const [result] = await database_1.default.query("INSERT INTO users (email, password, nama, role) VALUES (?, ?, ?, ?)", [email, password, nama, "user"]);
        res.status(201).json({
            message: "Registrasi berhasil",
            data: {
                id: result.insertId,
                email,
                nama,
                role: "user",
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
exports.register = register;
const logout = async (req, res) => {
    try {
        res.json({
            message: "Logout berhasil",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
exports.logout = logout;
