import { encriptAdapter } from '../../../config/bcrypt.adapter';
import { envs } from '../../../config/env';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { User } from '../../../data';
import { CustomError, loginUserDto } from '../../../domain/errors';

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    rol: string;
    name: string;
  };
};

export class LoginUserService {
  async execute(data: loginUserDto): Promise<LoginResponse> {
    const user = await this.ensureUserExist(data.email);
    await this.ensurePasswordIsCorrect(data.password, user.password);
    const token = await this.generateToken({ id: user.id }, envs.jwt.EXPIRE_IN);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
        name: user.name,
      },
    };
  }

  private async ensureUserExist(email: string) {
    const user = await User.findOne({
      where: {
        email,
        status: true,
      },
    });

    if (!user) {
      throw CustomError.notFound('User not found');
    }

    return user;
  }

  private async ensurePasswordIsCorrect(unHashedPassword: string, hashedPassword: string) {
    const isMatch = await encriptAdapter.compare(unHashedPassword, hashedPassword);

    if (!isMatch) {
      throw CustomError.unauthorized('Invalid credentials');
    }
  }

  private async generateToken(payload: any, duration: string): Promise<string> {
    const token = await JwtAdapter.generateToken(payload, duration);

    if (!token) {
      throw CustomError.internalServer('Error while creating JWT');
    }

    return token as string;
  }
}
