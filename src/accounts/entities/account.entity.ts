import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Account {
  @Field(() => Int, { description: "Example field (placeholder)" })
  exampleField: number;
}
