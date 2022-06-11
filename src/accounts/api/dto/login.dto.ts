import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class LoginDto {
  @Field()
  @IsString()
  user: string;

  @Field()
  @IsString()
  password: string;
}
