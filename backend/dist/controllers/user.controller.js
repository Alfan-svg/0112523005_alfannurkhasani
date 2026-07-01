"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAllUsers = async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.max(Number(req.query.limit) || 10, 1);
        const offset = (page - 1) * limit;
        const [countRows] = await database_1.default.query("SELECT COUNT(*) AS total FROM users");
        const total = countRows[0].total;
        const [rows] = await database_1.default.query("SELECT id, email, nama, role, created_at FROM users ORDER BY id DESC LIMIT ? OFFSET ?", [limit, offset]);
        res.json({
            message: "Data user berhasil diambil",
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit),
            },
            data: rows,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await database_1.default.query("SELECT id, email, nama, role, created_at FROM users WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }
        res.json({
            message: "Data user berhasil diambil",
            data: rows[0],
        });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, nama, role } = req.body;
        if (!email || !nama || !role) {
            return res.status(400).json({
                message: "Email, nama, dan role wajib diisi",
            });
        }
        const [result] = await database_1.default.query("UPDATE users SET email = ?, nama = ?, role = ? WHERE id = ?", [email, nama, role, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }
        res.json({ message: "User berhasil diperbarui" });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await database_1.default.query("DELETE FROM users WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }
        res.json({ message: "User berhasil dihapus" });
    }
    catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
exports.deleteUser = deleteUser;
