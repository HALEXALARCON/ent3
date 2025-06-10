import { encriptAdapter } from "../../../config/bcrypt.adapter";
import { User } from "../../../data";
import { CustomError, RegisterUserDto } from "../../../domain/errors";


export class CreatorUserService {
  async execute(data: RegisterUserDto): Promise<User> {
    const user = new User();

    // Asigna los campos del DTO
    user.name = data.name.trim().toLowerCase();
    user.email = data.email.trim().toLowerCase();
    // Hace que se encripte la contraseña antes de guardarla en la base de datos
    user.password = encriptAdapter.hash(data.password.trim());

    // Asegura que el campo 'status' tenga un valor por defecto
    user.status = true;

    try {
      // Intenta insertar el usuario en la base de datos
      return await user.save();
    } catch (err: any) {

      CustomError.internalServer('internal server error');

      // Lanza el error original para su manejo posterior
      throw err;
    }
  }
}
