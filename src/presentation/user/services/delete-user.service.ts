import { User } from "../../../data";

export class DeleteUserService {
  async execute(id: string): Promise<{ message: string }> {

    const user = await User.findOne({ where: { id, status: true } });
    if (!user) {
      throw new Error("User not found");
    }


    user.status = false;
    try {
      await user.save();
    } catch (err) {
      throw new Error("Error deleting user: " + (err as Error).message);
    }

    return { message: "User deleted successfully" };
  }
}
