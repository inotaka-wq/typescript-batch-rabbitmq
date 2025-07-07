// src/usecase/CreateUserUseCase.ts
import { inject, injectable } from "tsyringe";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { RabbitMQPublisher } from "@/infrastructure/rabbitmq/publisher";

interface CreateUserInput {
  name: string;
  email: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository,
    @inject("RabbitMQPublisher") private publisher: RabbitMQPublisher
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    const user = await this.userRepository.create(input);

    // 成功したら次の処理へ送信
    await this.publisher.publish({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  }
}
