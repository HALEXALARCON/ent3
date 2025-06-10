import 'reflect-metadata';
import { DataSource, Repository } from 'typeorm';
import { PetPost } from '../../../data';
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
  entities: [PetPost],
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

    // Verifica si la publicación de mascota existe
    const petPost = await this.petPostRepository.findOne({ where: { id } });
    if (!petPost) {
      throw new Error('Publicación de mascota no encontrada');
    }

    // Actualiza los campos de la publicación de mascota
    Object.assign(petPost, data);

    // Guarda los cambios y devuelve la entidad actualizada
    const updatedPetPost = await this.petPostRepository.save(petPost);
    return updatedPetPost;
  }
}
