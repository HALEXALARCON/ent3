import { PetPost } from "../../../data";
import { petPostStatus } from "../../../data";

export class DeletePetPostService {
  async execute(id: string): Promise<{ message: string }> {
    const petPost = await PetPost.findOneBy({ id });

    if (!petPost) {
      throw new Error("Pet post not found");
    }

    if (petPost.status === petPostStatus.INACTIVE) {
      throw new Error("Pet post is already inactive");
    }

    petPost.status = petPostStatus.INACTIVE;

    try {
      await petPost.save();
    } catch (err) {
      throw new Error("Error deleting pet post: " + (err as Error).message);
    }

    return { message: "Pet post deleted successfully" };
  }
}
