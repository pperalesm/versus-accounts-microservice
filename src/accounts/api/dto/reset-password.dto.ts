import { InputType, Field } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";
import { Constants } from "src/constants";

@InputType()
export class ResetPasswordDto {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  token: string;

  @Field()
  @MinLength(Constants.MIN_PASSWORD_CHARACTERS)
  password: string;
}
