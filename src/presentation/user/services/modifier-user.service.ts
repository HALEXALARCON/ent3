import { User } from '../../../data';
import { PostgresDatabase } from '../../../data/postgres/postgres-database';

const db = new PostgresDatabase({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
});

export class ModifierUserService {
  private userRepository = db.datasource.getRepository(User);

  async update(id: string, data: Partial<User>) {
    if (!db.datasource.isInitialized) {
      await db.connect();
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    Object.assign(user, data);

    return await this.userRepository.save(user);
  }
}
