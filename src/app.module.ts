import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CodesModule } from "./codes/codes.module";
import { AccountsModule } from "./accounts/accounts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "local.env",
      ignoreEnvFile: process.env.NODE_ENV && process.env.NODE_ENV != "local",
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/accounts-microservice?authSource=admin`,
    ),
    CodesModule,
    AccountsModule,
  ],
})
export class AppModule {}
