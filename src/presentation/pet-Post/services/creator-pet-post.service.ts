import { PetPost } from "../../../data";
import { CustomError } from "../../../domain/errors";


export class CreatorPetPostService {

  async execute(data: any) {

    const petPost = new PetPost();

    petPost.petName = data.petName.trim().toLowerCase();
    petPost.description = data.description.trim().toLowerCase();
    petPost.image_url = data.imagen_url.trim();

    try {
      return await petPost.save();
    } catch (error) {
      throw CustomError.internalServer('internal server error');
    }
  }
}