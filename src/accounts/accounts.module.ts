import { Module } from "@nestjs/common";
import { AccountsService } from "./domain/accounts.service";
import { AccountsResolver } from "./api/accounts.resolver";
import { AccountsRepository } from "./infrastructure/accounts.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "./domain/entities/account.entity";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "backend-common";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: "1h" },
    }),
    CommonModule,
  ],
  providers: [AccountsResolver, AccountsService, AccountsRepository],
})
export class AccountsModule {}
