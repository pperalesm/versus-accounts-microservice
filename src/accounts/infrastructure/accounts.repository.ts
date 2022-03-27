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
    const inAccountDocument = new this.accountModel(this.fromDomain(inAccount));
    const outAccountDocument = await inAccountDocument.save();
    return this.toDomain(outAccountDocument);
  }

  toDomain(before: AccountDocument): Account {
    const now = plainToInstance(Account, instanceToPlain(before.toJSON()), {
      excludeExtraneousValues: true,
    });
    now.id = before.id;
    return now;
  }

  fromDomain(before: Account): AccountEntity {
    const now = plainToInstance(AccountEntity, instanceToPlain(before), {
      excludeExtraneousValues: true,
    });
    return now;
  }
}
