import { sequelize } from "./infrastructure/db/sequelize";
import { UserModel } from "./infrastructure/db/models/UserModel";

sequelize.sync().then(() => {
  console.log("✅ MySQL connected and UserModel synced!");
});
