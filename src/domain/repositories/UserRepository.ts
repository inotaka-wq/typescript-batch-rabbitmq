// src/domain/repositories/UserRepository.ts
import { User } from "../entities/User";

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
}
