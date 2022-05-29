import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AccountsModule } from "./accounts/accounts.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { MongooseModule } from "@nestjs/mongoose";
import { Constants } from "./constants";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "local.env",
      ignoreEnvFile: process.env.NODE_ENV && process.env.NODE_ENV != "local",
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${Constants.ACCOUNTS_DB}?authSource=admin`,
    ),
    AccountsModule,
  ],
})
export class AppModule {}
