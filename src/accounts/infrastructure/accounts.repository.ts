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

  async updateOne(
    filter: Record<string, unknown>,
    updateInfo: Account,
  ): Promise<Account> {
    return await this.accountModel.findOneAndUpdate(filter, updateInfo, {
      new: true,
    });
  }

  async findById(id: string): Promise<Account> {
    return await this.accountModel.findById(id);
  }

  async findOne(filter: Record<string, unknown>): Promise<Account> {
    return await this.accountModel.findOne(filter);
  }

  async removeById(id: string): Promise<Account> {
    return await this.accountModel.findByIdAndRemove(id);
  }
}
