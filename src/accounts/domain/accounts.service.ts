import { Injectable } from "@nestjs/common";
import { AccountsRepository } from "../infrastructure/accounts.repository";
import { Account } from "./Account";

@Injectable()
export class AccountsService {
  constructor(private accountsRepository: AccountsRepository) {}

  async signup(account: Account): Promise<Account> {
    account.avatarPath = "defaultAvatar.png";
    account.role = "CLIENT";
    account.active = false;
    return await this.accountsRepository.create(account);
  }
}
