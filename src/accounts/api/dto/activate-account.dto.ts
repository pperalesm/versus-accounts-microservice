import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class ActivateAccountDto {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  token: string;
}
