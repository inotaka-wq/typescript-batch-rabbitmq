// src/infrastructure/rabbitmq/publisher.ts
import amqp from "amqplib";
import * as dotenv from "dotenv";

dotenv.config();

export class RabbitMQPublisher {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async connect() {
    if (this.connection && this.channel) return;

    this.connection = await amqp.connect({
      hostname: process.env.RABBITMQ_HOST,
      port: Number(process.env.RABBITMQ_PORT || 5672),
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
    });

    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(
      process.env.RABBITMQ_QUEUE_OUT || "user_created",
      { durable: true }
    );
  }

  async publish(message: any) {
    if (!this.channel) {
      await this.connect();
    }

    const queue = process.env.RABBITMQ_QUEUE_OUT || "user_created";
    const payload = Buffer.from(JSON.stringify(message));

    this.channel!.sendToQueue(queue, payload, { persistent: true });
    console.log(`📤 Sent message to queue "${queue}":`, message);
  }

  async close() {
    await this.channel?.close();
    await this.connection?.close();
  }
}
