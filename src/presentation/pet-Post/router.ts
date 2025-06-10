import { Router } from "express";
import { PetPostController } from "./controller";
import { CreatorPetPostService } from "./services/creator-pet-post.service";
import { FinderPetPostService } from "./services/finder.petpost.server";
import { ApprovePetPostservice } from "./services/aprove-pet-post.service";
import { RejectedPetPostService } from "./services/reject-pet-post.service";
import { ModifierPetPostService } from "./services/modifier-pet-post.service";
import { DeletePetPostService } from "./services/delete-pet-post.services";

export class petPostRoutes {
  static save() {
    throw new Error("Method not implemented.");
  }
  static get routes() {
    const router = Router();


    const creatorPetPostService = new CreatorPetPostService();
    const finderPetPostService = new FinderPetPostService();
    const approvePetPostService = new ApprovePetPostservice(finderPetPostService);
    const rejectedPetpostService = new RejectedPetPostService(finderPetPostService);
    const modifierPetPostService = new ModifierPetPostService();
    const deletePetPostService = new DeletePetPostService();
    const controller = new PetPostController(
      creatorPetPostService,
      finderPetPostService,
      approvePetPostService,
      rejectedPetpostService,
      modifierPetPostService,
      deletePetPostService
    );
    router.post('/', controller.create);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findOne);
    router.patch('/:id/approve', controller.approve);
    router.patch('/:id/rejected', controller.rejected);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
