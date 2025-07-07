// src/domain/entities/User.ts
export class User {
  constructor(
    public readonly id: number | null,
    public name: string,
    public email: string,
    public readonly createdAt: Date
  ) {}
}
