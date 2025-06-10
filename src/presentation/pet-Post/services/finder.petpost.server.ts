import { PetPost, petPostStatus } from "../../../data";
import { CustomError } from "../../../domain/errors";



export class FinderPetPostService {

  async executeByFindAll() {

    const petPosts = await PetPost.find({

      where: {
        status: petPostStatus.APPROVED,

        hasFound: false,
      },

      relations: {
        user: true,
      },

      select: {
        id: true,
        petName: true,
        description: true,
        image_url: true,
        status: true,
        hasFound: true,

        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return petPosts;
  }


  async executeByFindOne(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        id: id,
      },
    });

    if (!petPost) {
      throw CustomError.notFound('pet not found');
    }

    return petPost;
  }
}