import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../../../config/jwt.adapter";
import { User, userRole } from "../../../../data";

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    try {
      let token: string | undefined;

      // 1. Token desde cookies
      if (req.cookies?.token) {
        token = req.cookies.token;
      }

      // 2. Token desde header Authorization
      else if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }

      // 3. Token desde query params
      else if (req.query.token) {
        token = String(req.query.token);
      }

      // Si no se encuentra el token
      if (!token) {
        return res.status(401).json({
          message: "token not provided",
        });
      }

      // Validar token
      const payload = await JwtAdapter.validateToken(token);

      if (!payload || typeof payload !== 'object' || !('id' in payload)) {
        return res.status(401).json({ message: "invalid token" });
      }

      // Buscar usuario
      const user = await User.findOne({
        where: {
          id: (payload as any).id,
          status: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "invalid token" });
      }

      // Agregar usuario a la request (TypeScript workaround)
      (req as any).sessionUser = user;

      next();
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(500).json({
        message: "internal server error",
      });
    }
  }

  static restrictToAdmin = (...roles: userRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).sessionUser;

      if (!user || !roles.includes(user.rol)) {
        return res.status(403).json({
          message: "you are not authorized to access this route",
        });
      }

      next();
    };
  };
}
