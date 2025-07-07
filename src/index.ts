import "reflect-metadata";
import "./presentation/di";
import { sequelize } from "./infrastructure/db/sequelize";
import { UserModel } from "./infrastructure/db/models/UserModel";
import { startConsumer } from "./infrastructure/rabbitmq/consumer";

sequelize.sync().then(() => {
  console.log("✅ MySQL connected and UserModel synced!");

  startConsumer().then(() => {
    console.log("📡 Consumer started.");
  });
});
