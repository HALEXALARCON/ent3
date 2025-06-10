import 'reflect-metadata';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../../data';
import 'dotenv/config';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export class ModifierUserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = undefined!;
  }

  private async initializeRepository() {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    this.userRepository = dataSource.getRepository(User);
  }

  async update(id: string, data: Partial<User>) {
    if (!this.userRepository) {
      await this.initializeRepository();
    }

    // Verifica si el usuario existe
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Actualiza los campos del usuario
    Object.assign(user, data);

    // Guarda los cambios y devuelve la entidad actualizada
    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }
}
