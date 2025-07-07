// src/infrastructure/db/repositories/SequelizeUserRepository.ts
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import { UserModel } from "../models/UserModel";

export class SequelizeUserRepository implements UserRepository {
  async findById(id: number): Promise<User | null> {
    const model = await UserModel.findByPk(id);
    return model ? this.toEntity(model) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const model = await UserModel.findOne({ where: { email } });
    return model ? this.toEntity(model) : null;
  }

  async create(user: User): Promise<void> {
    await UserModel.create({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  }

  private toEntity(model: UserModel): User {
    return new User(model.id, model.name, model.email, model.createdAt);
  }
}
