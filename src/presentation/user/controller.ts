import { Request, Response } from 'express';
import { CreatorUserService } from './services/creator-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';
import { ModifierUserService } from './services/modifier-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { handleError } from '../common/errors/handleError';
import { loginUserDto, RegisterUserDto } from '../../domain/errors';
import { envs } from '../../config/env';

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly loginUserService: LoginUserService,
    private readonly finderUserService: FinderUserService,
    private readonly modifierUserService: ModifierUserService,
    private readonly deleteUserService: DeleteUserService
  ) { }

  register = async (req: Request, res: Response): Promise<void> => {
    const [error, data] = RegisterUserDto.execute(req.body);

    if (error) {
      res.status(422).json({ message: error });
      return;
    }

    try {
      const user = await this.creatorUserService.execute(data!);
      res.status(201).json(user);
    } catch (error) {
      handleError(error, res);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    console.log('Body recibido:', req.body);
    const [error, loginData] = loginUserDto.execute(req.body);

    if (error) {
      res.status(422).json({ message: error });
      return;
    }

    try {
      const loginResult = await this.loginUserService.execute(loginData!);
      res.cookie('token', loginResult.token, {
        httpOnly: true,
        secure: envs.app.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3 * 60 * 60 * 1000,
      })
      res.status(200).json(loginResult);
    } catch (error) {
      handleError(error, res);
    }
  };

  findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.finderUserService.executeByFindAll();
      res.status(200).json(users);
    } catch (error) {
      handleError(error, res);
    }
  };

  findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.finderUserService.executeByFindOne(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      handleError(error, res);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedUser = await this.modifierUserService.update(id, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      handleError(error, res);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.deleteUserService.execute(id);
      res.status(200).json(result);
    } catch (error) {
      handleError(error, res);
    }
  };

}

export default UserController;
