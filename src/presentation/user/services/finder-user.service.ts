import { User } from "../../../data";
import { CustomError } from "../../../domain/errors";


export class FinderUserService {

  async executeByFindAll(): Promise<User[]> {
    return await User.find({
      select: ["id", "name", "email"],
      where: { status: true },
    });
  }

  async executeByFindOne(id: string): Promise<User> {
    const user = await User.findOne({
      where: { status: true, id },
    });
    if (!user) throw CustomError.notFound("User not found");
    return user;
  }
}
