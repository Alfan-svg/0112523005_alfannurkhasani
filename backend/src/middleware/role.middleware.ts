import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        return res.status(401).json({
          message: "User role tidak ditemukan",
        });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Anda tidak memiliki akses ke resource ini",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan server",
      });
    }
  };
};

export default roleMiddleware;
