import 'reflect-metadata';
import { DataSource, Repository } from 'typeorm';
import { PetPost } from '../../../data';
import { User } from '../../../data'; // ✅ importar User también
import 'dotenv/config';
import { CustomError } from '../../../domain/errors';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [PetPost, User], // ✅ agregar ambas entidades
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export class ModifierPetPostService {
  private petPostRepository: Repository<PetPost>;

  constructor() {
    this.petPostRepository = undefined!;
  }

  private async initializeRepository() {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    this.petPostRepository = dataSource.getRepository(PetPost);
  }

  async update(id: string, data: Partial<PetPost>) {
    if (!this.petPostRepository) {
      await this.initializeRepository();
    }
    console.log('ID:', id);

    const petPost = await this.petPostRepository.findOne({ where: { id } });
    if (!petPost) {
      throw CustomError.notFound('Pet post not found');
    }

    try {
      Object.assign(petPost, data);
      const updatedPetPost = await this.petPostRepository.save(petPost);
      return updatedPetPost;
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
}
