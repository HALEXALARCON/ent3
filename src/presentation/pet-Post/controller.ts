import { Request, Response } from 'express';
import { CreatorPetPostService } from './services/creator-pet-post.service';
import { FinderPetPostService } from './services/finder.petpost.server';
import { ApprovePetPostservice } from './services/aprove-pet-post.service';
import { RejectedPetPostService } from './services/reject-pet-post.service';
import { ModifierPetPostService } from './services/modifier-pet-post.service';
import { DeletePetPostService } from './services/delete-pet-post.services';
import { handleError } from '../common/errors/handleError';


export class PetPostController {
  constructor(
    private readonly creatorPetPostService: CreatorPetPostService,
    private readonly finderPetPostService: FinderPetPostService,
    private readonly approvePetPostService: ApprovePetPostservice,
    private readonly rejectedPetPostService: RejectedPetPostService,
    private readonly modifierPetPostService: ModifierPetPostService,
    private readonly deletePetPostService: DeletePetPostService
  ) { }

  // Crear una nueva publicación de mascota
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const petPost = await this.creatorPetPostService.execute(req.body, req.body.sessionUser); // ✅ Se pasa el usuario
      console.log(petPost)
      res.status(201).json(petPost);
    } catch (error) {
      handleError(error, res);
    }
  };


  // Obtener todas las publicaciones de mascotas
  findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const petPosts = await this.finderPetPostService.executeByFindAll();
      res.status(200).json(petPosts);
    } catch (error) {
      handleError(error, res);
    }
  };

  // Obtener una publicación de mascota por ID
  findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const petPost = await this.finderPetPostService.executeByFindOne(id);
      if (!petPost) {
        res.status(404).json({ message: 'Pet post not found' });
        return;
      }
      res.status(200).json(petPost);
    } catch (error) {
      handleError(error, res);
    }
  };

  // Aprobar una publicación de mascota
  approve = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const petPost = await this.approvePetPostService.execute(id);
      res.status(200).json(petPost);
    } catch (error) {
      handleError(error, res);
    }
  };

  // Rechazar una publicación de mascota
  rejected = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const petPost = await this.rejectedPetPostService.execute(id);
      res.status(200).json(petPost);
    } catch (error) {
      handleError(error, res);
    }
  };

  // Actualizar una publicación de mascota
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedPetPost = await this.modifierPetPostService.update(id, req.body);
      res.status(200).json(updatedPetPost);
    } catch (error) {
      handleError(error, res);
    }
  };

  // Eliminar una publicación de mascota
  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.deletePetPostService.execute(id);
      res.status(200).json(result);
    } catch (error) {
      handleError(error, res);
    }
  };
}
