import { Request, Response, NextFunction } from "express";

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        nama: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token tidak ditemukan",
      });
    }

    // TODO: Verify JWT token
    // For now, we'll just pass through
    // In production, decode JWT and verify signature

    next();
  } catch (error) {
    res.status(401).json({
      message: "Akses tidak sah",
    });
  }
};

export default authMiddleware;
