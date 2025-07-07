// src/usecase/CreateUserUseCase.ts
import { injectable, inject } from "tsyringe";
import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/entities/User";

interface CreateUserInput {
  name: string;
  email: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    // すでに存在するか確認
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      console.warn(`⚠️ User with email ${input.email} already exists.`);
      return;
    }

    const user = new User(null, input.name, input.email, new Date());
    await this.userRepository.create(user);

    console.log(`✅ User "${input.name}" created`);
  }
}
