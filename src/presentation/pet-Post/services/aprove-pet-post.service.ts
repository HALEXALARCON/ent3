import { PetPost, petPostStatus } from "../../../data";
import { CustomError } from "../../../domain/errors";
import { FinderPetPostService } from "./finder.petpost.server";


export class ApprovePetPostservice {

  constructor(private readonly finderPetPostService: FinderPetPostService) { }

  async execute(id: string) {

    const petPost = await this.finderPetPostService.executeByFindOne(id);


    if (petPost.status === 'approved') {
      return {
        message: 'Pet post already approved',
      };
    }

    petPost.status = petPostStatus.APPROVED;

    try {

      await petPost.save();

      return 'Pet post appoved successfully';

    } catch (error) {
      throw CustomError.internalServer('internal server error');
    }
  }
}