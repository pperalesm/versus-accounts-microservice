import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountsModule } from "./accounts/accounts.module";
import { CodesModule } from "./codes/codes.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb://admin:admin@0.0.0.0:27017/accounts-microservice?authSource=admin",
    ),
    AccountsModule,
    CodesModule,
  ],
})
export class AppModule {}
