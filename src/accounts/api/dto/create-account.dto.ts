import { InputType, Field } from "@nestjs/graphql";
import { Matches, MaxLength, MinLength } from "class-validator";
import { Constants } from "src/constants";

@InputType()
export class CreateAccountDto {
  @Field()
  @Matches(Constants.EMAIL_PATTERN)
  @MaxLength(Constants.MAX_EMAIL_CHARACTERS)
  email: string;

  @Field()
  @MinLength(Constants.MIN_USERNAME_CHARACTERS)
  @MaxLength(Constants.MAX_USERNAME_CHARACTERS)
  @Matches(Constants.USERNAME_PATTERN)
  username: string;

  @Field()
  @MinLength(Constants.MIN_PASSWORD_CHARACTERS)
  password: string;
}
