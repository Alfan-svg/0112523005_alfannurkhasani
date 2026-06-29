import { Request, Response } from "express";
import db from "../config/database";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const offset = (page - 1) * limit;

    const [countRows]: any = await db.query(
      "SELECT COUNT(*) AS total FROM users"
    );

    const total = countRows[0].total;

    const [rows] = await db.query(
      "SELECT id, email, nama, role, created_at FROM users ORDER BY id DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

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
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [rows]: any = await db.query(
      "SELECT id, email, nama, role, created_at FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({
      message: "Data user berhasil diambil",
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, nama, role } = req.body;

    if (!email || !nama || !role) {
      return res.status(400).json({
        message: "Email, nama, dan role wajib diisi",
      });
    }

    const [result]: any = await db.query(
      "UPDATE users SET email = ?, nama = ?, role = ? WHERE id = ?",
      [email, nama, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({ message: "User berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result]: any = await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
