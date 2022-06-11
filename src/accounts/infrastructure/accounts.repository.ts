import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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
    try {
      return await this.accountModel.create(account);
    } catch (e) {
      throw new ConflictException();
    }
  }

  async updateOne(
    filter: Record<string, unknown>,
    updateInfo: Record<string, unknown>,
  ): Promise<Account> {
    const account = await this.accountModel.findOneAndUpdate(
      filter,
      updateInfo,
      {
        new: true,
      },
    );

    if (!account) {
      throw new NotFoundException();
    }

    return account;
  }

  async findOne(filter: Record<string, unknown>): Promise<Account> {
    const account = await this.accountModel.findOne(filter);

    if (!account) {
      throw new NotFoundException();
    }

    return account;
  }

  async deleteOne(filter: Record<string, unknown>): Promise<Account> {
    const account = await this.accountModel.findOneAndDelete(filter);

    if (!account) {
      throw new NotFoundException();
    }

    return account;
  }
}
