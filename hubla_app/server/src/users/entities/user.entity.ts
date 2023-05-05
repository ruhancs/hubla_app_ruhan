import { User } from "@prisma/client";

export class UserEntity implements User {
  id: number;
  name: string;
  balance: number;
  createdAt: Date;
}
