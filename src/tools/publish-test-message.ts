// src/tools/publish-test-message.ts
import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

async function publishTestMessage() {
  const connection = await amqp.connect({
    hostname: process.env.RABBITMQ_HOST,
    port: Number(process.env.RABBITMQ_PORT),
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
  });

  const channel = await connection.createChannel();
  const queue = process.env.RABBITMQ_QUEUE_IN || "create_user";

  await channel.assertQueue(queue, { durable: true });

  const message = {
    name: "テストユーザー",
    email: `test-${Date.now()}@example.com`,
  };

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });

  console.log(`📨 Sent message to "${queue}":`, message);

  await channel.close();
  await connection.close();
}

publishTestMessage().catch((err) => {
  console.error("❌ Failed to publish:", err);
});
