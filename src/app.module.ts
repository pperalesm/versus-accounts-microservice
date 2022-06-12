import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountsModule } from "./accounts/accounts.module";
import { Constants } from "./constants";

@Module({
  imports: [
    AccountsModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${Constants.ACCOUNTS_DB}?retryWrites=true&w=majority`,
    ),
  ],
})
export class AppModule {}
