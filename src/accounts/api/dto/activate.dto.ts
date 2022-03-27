import { Expose } from "class-transformer";
import { IsAlphanumeric, IsEmail, IsHash } from "class-validator";

export class InActivateDto {
  @IsEmail()
  id: string;

  @IsAlphanumeric()
  username: string;

  @IsHash("sha256")
  password: string;
}

export class OutActivateDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  role: string;

  @Expose()
  active: boolean;

  @Expose()
  avatarPath: string;
}
