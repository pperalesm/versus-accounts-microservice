import { Module } from "@nestjs/common";
import { AccountsService } from "./domain/accounts.service";
import { AccountsResolver } from "./api/accounts.resolver";
import { AccountsRepository } from "./infrastructure/accounts.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "./domain/entities/account.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  providers: [AccountsResolver, AccountsService, AccountsRepository],
})
export class AccountsModule {}
