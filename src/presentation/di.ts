// src/presentation/di.ts
import { container } from "tsyringe";
import { UserRepository } from "@/domain/repository/UserRepository";
import { SequelizeUserRepository } from "@/infrastructure/repository/SequelizeUserRepository";
import { RabbitMQPublisher } from "@/infrastructure/rabbitmq/publisher";

container.register<UserRepository>("UserRepository", {
  useClass: SequelizeUserRepository,
});

container.register<RabbitMQPublisher>("RabbitMQPublisher", {
  useClass: RabbitMQPublisher,
});
