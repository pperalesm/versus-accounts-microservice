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

  async findAll(): Promise<Array<Account>> {
    return await this.accountModel.find();
  }

  async findOne(id: string) {
    return await this.accountModel.findById(id);
  }

  async update(id: number) {}

  async remove(id: number) {}
}
