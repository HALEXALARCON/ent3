import { PetPost, petPostStatus } from "../../../data";
import { CustomError } from "../../../domain/errors";
import { FinderPetPostService } from "./finder.petpost.server";

export class RejectedPetPostService {

  constructor(
    private readonly finderPetPostService: FinderPetPostService
  ) { };


  async execute(id: string) {

    const petPost = await this.finderPetPostService.executeByFindOne(id);


    if (PetPost.status === 'approved') {
      throw CustomError.badRequest('Pet post already approved');
    }

    if (petPost.status === 'rejected') {
      throw CustomError.badRequest('Pet post already rejected');
    }


    petPost.status = petPostStatus.REJECTED;


    try {
      await petPost.save();

      return {
        message: 'Pet post rejected successfully',
      }
    } catch (error) {
      throw CustomError.internalServer('internal server error');
    }
  }
}