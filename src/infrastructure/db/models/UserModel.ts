// src/infrastructure/db/models/UserModel.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../sequelize"; // 接続定義ファイル（後で作成）

// User型に合わせた属性定義
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// 作成時にはid/createdAtは省略可能
type UserCreationAttributes = Optional<UserAttributes, "id" | "createdAt">;

export class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public createdAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: false, // createdAtのみ管理
  }
);
