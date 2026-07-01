"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
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
    }
    catch (error) {
        res.status(401).json({
            message: "Akses tidak sah",
        });
    }
};
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
