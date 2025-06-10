import jwt from 'jsonwebtoken';
import { envs } from './env';

interface JwtPayload {
  id: string;
  // otros campos según sea necesario
}

export class JwtAdapter {
  // Generar token
  static async generateToken(payload: JwtPayload, duration: string = '3h'): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, envs.jwt.KEY, { expiresIn: duration }, (err: Error | null, token: string | undefined) => {
        if (err || !token) return resolve(null);
        resolve(token);
      });
    });
  }

  // Validar token
  static async validateToken(token: string): Promise<JwtPayload | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.jwt.KEY, (err: Error | null, decoded: unknown) => {
        if (err || !decoded) return resolve(null);
        resolve(decoded as JwtPayload);
      });
    });
  }
}
