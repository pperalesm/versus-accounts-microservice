import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Model } from "mongoose";
import { Account } from "../domain/Account";
import { AccountDocument, Account as AccountEntity } from "./account.schema";

@Injectable()
export class AccountsRepository {
  constructor(
    @InjectModel(AccountEntity.name)
    private accountModel: Model<AccountDocument>,
  ) {}

  async create(inAccount: Account): Promise<Account> {
    const outAccountDocument = await this.accountModel.create(inAccount);
    return this.toDomain(outAccountDocument.toObject());
  }

  toDomain(before: any): Account {
    const now = plainToInstance(Account, instanceToPlain(before), {
      excludeExtraneousValues: true,
    });
    if (before.id) {
      now.id = before.id;
    }
    return now;
  }
}
