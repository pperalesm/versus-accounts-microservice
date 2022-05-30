import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AccountDocument, Account } from "../domain/entities/account.entity";

@Injectable()
export class AccountsRepository {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<AccountDocument>,
  ) {}

  async create(account: Account): Promise<Account> {
    return await this.accountModel.create(account);
  }

  async update(account: Account): Promise<Account> {
    return await this.accountModel.findByIdAndUpdate(account.id, account, {
      new: true,
    });
  }

  async findOne(id: string): Promise<Account> {
    return await this.accountModel.findById(id);
  }

  async findAll(): Promise<Array<Account>> {
    return await this.accountModel.find();
  }

  async remove(id: string): Promise<Account> {
    return await this.accountModel.findByIdAndRemove(id);
  }
}
