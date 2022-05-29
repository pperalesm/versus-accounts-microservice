import { Injectable } from "@nestjs/common";
import { Code } from "src/codes/domain/Code";
import { CodesService } from "src/codes/domain/codes.service";
import { AccountsRepository } from "../infrastructure/accounts.repository";
import { Account } from "./Account";

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly codesService: CodesService,
  ) {}

  async signup(inAccount: Account): Promise<Account> {
    inAccount.avatarPath = "defaultAvatar.png";
    inAccount.role = "CLIENT";
    inAccount.active = false;
    const outAccount = await this.accountsRepository.create(inAccount);
    const code = await this.codesService.getCode(outAccount);
    // TODO: Call email service to send URL with code
    return outAccount;
  }

  async activate(id: string) {
    await this.codesService.consume();
  }
}
