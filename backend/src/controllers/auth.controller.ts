import { Request, Response } from "express";
import db from "../config/database";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    const [rows]: any = await db.query(
      "SELECT id, email, nama, role FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

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
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nama } = req.body;

    if (!email || !password || !nama) {
      return res.status(400).json({
        message: "Email, password, dan nama wajib diisi",
      });
    }

    const [existing]: any = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const [result]: any = await db.query(
      "INSERT INTO users (email, password, nama, role) VALUES (?, ?, ?, ?)",
      [email, password, nama, "user"]
    );

    res.status(201).json({
      message: "Registrasi berhasil",
      data: {
        id: result.insertId,
        email,
        nama,
        role: "user",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.json({
      message: "Logout berhasil",
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
