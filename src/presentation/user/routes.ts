import { Router } from "express";
import UserController from "./controller";
import { CreatorUserService } from "./services/creator-user.service";
import { LoginUserService } from "./services/login-user.service";
import { FinderUserService } from "./services/finder-user.service";
import { DeleteUserService } from "./services/delete-user.service";
import { ModifierUserService } from "./services/modifier-user.service";
import { AuthMiddleware } from "../common/errors/middlewares/auth.middleware";
import { userRole } from "../../data";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    // Instancia de servicios
    const creatorUserService = new CreatorUserService();
    const loginUserService = new LoginUserService();
    const finderUserService = new FinderUserService();
    const modifierUserService = new ModifierUserService();
    const deleteUserService = new DeleteUserService();

    // Controlador configurado con las instancias de servicio
    const controller = new UserController(
      creatorUserService,
      loginUserService,
      finderUserService,
      modifierUserService,
      deleteUserService
    );

    // Rutas públicas
    router.post("/register", controller.register);
    router.post("/login", controller.login);

    // Middleware de autenticación para rutas protegidas
    router.use(AuthMiddleware.protect);

    // Rutas protegidas
    router.get("/:id", controller.findOne);

    // Solo admin puede actualizar, eliminar o listar todos
    router.patch(
      "/:id",
      AuthMiddleware.restrictToAdmin(userRole.ADMIN),
      controller.update
    );

    router.delete(
      "/:id",
      AuthMiddleware.restrictToAdmin(userRole.ADMIN),
      controller.delete
    );

    router.get(
      "/",
      AuthMiddleware.restrictToAdmin(userRole.ADMIN),
      controller.findAll
    );

    return router;
  }
}
