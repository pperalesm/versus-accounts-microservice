import { InputType, Field } from "@nestjs/graphql";
import { IsAlphanumeric, IsEmail, IsString } from "class-validator";

@InputType()
export class CreateAccountDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsAlphanumeric()
  username: string;

  @Field()
  @IsString()
  password: string;
}
