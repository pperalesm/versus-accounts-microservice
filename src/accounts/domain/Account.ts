import { Expose } from "class-transformer";

export class Account {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  role: string;

  @Expose()
  active: boolean;

  @Expose()
  avatarPath: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
