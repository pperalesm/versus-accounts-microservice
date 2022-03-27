import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CodesModule } from "src/codes/codes.module";
import { AccountsController } from "./api/accounts.controller";
import { AccountsService } from "./domain/accounts.service";
import { Account, AccountSchema } from "./infrastructure/account.schema";
import { AccountsRepository } from "./infrastructure/accounts.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    CodesModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository],
})
export class AccountsModule {}
