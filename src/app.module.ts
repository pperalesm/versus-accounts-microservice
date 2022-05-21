import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountsModule } from "./accounts/accounts.module";
import { CodesModule } from "./codes/codes.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV == "production",
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/accounts-microservice?authSource=admin`,
    ),
    AccountsModule,
    CodesModule,
  ],
})
export class AppModule {}
