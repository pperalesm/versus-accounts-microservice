import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateAccountDto {
  @Field()
  id: string;
}
