"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
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
        }
        catch (error) {
            res.status(500).json({
                message: "Terjadi kesalahan server",
            });
        }
    };
};
exports.roleMiddleware = roleMiddleware;
exports.default = exports.roleMiddleware;
