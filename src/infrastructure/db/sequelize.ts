// src/infrastructure/db/sequelize.ts
import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false, // logが欲しければ true に
});
