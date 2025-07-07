// src/infrastructure/rabbitmq/consumer.ts
import amqp from "amqplib";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../../usecase/CreateUserUseCase";
import * as dotenv from "dotenv";

dotenv.config();

export async function startConsumer() {
  const queue = process.env.RABBITMQ_QUEUE_IN || "create_user";
  const useCase = container.resolve(CreateUserUseCase);

  const connection = await amqp.connect({
    hostname: process.env.RABBITMQ_HOST || "localhost",
    port: Number(process.env.RABBITMQ_PORT || 5672),
    username: process.env.RABBITMQ_USER || "guest",
    password: process.env.RABBITMQ_PASSWORD || "guest",
  });

  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });

  console.log(`🟢 Waiting for messages in queue: "${queue}"`);

  channel.consume(queue, async (msg) => {
    if (msg) {
      try {
        const content = JSON.parse(msg.content.toString());

        await useCase.execute({
          name: content.name,
          email: content.email,
        });

        channel.ack(msg);
      } catch (err) {
        console.error("❌ Failed to process message:", err);
        // エラーでもackしないとMQが詰まる可能性あり。運用ポリシー次第。
        channel.nack(msg, false, false); // false,false なら破棄される
      }
    }
  });
}
