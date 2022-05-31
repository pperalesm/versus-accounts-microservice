import { InputType, Field } from "@nestjs/graphql";
import { IsAlphanumeric, IsEmail, MinLength } from "class-validator";
import { Constants } from "src/constants";

@InputType()
export class CreateAccountDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsAlphanumeric()
  @MinLength(Constants.MIN_USERNAME_CHARACTERS)
  username: string;

  @Field()
  @MinLength(Constants.MIN_PASSWORD_CHARACTERS)
  password: string;
}
