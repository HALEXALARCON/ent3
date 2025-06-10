import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { petPostRoutes } from "./pet-Post/router";

export class AppRoutes {

  static get routes() {

    const router = Router();

    router.use('/api/users', UserRoutes.routes);
    router.use('/api/pet-posts', petPostRoutes.routes);

    return router;
  }
}