import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { CreateAccountDto } from "../api/dto/create-account.dto";
import { UpdateAccountDto } from "../api/dto/update-account.dto";
import { AccountsRepository } from "../infrastructure/accounts.repository";
import { Account } from "./entities/account.entity";

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly mailerService: MailerService,
  ) {}

  async create(createAccountInput: CreateAccountDto) {
    let account = new Account({
      avatarPath: "defaultAvatar.png",
      ...createAccountInput,
      role: "CLIENT",
      active: false,
    });

    account = await this.accountsRepository.create(account);

    this.mailerService
      .sendMail({
        to: account.email,
        subject: "Versus account activation",
        html: `<p>Please follow this <a href="https://versus.gg/auth/activate/${account.id}" target="_blank" rel="noopener noreferrer">link</a> to activate your Versus account!<p>`,
      })
      .catch(() => {});

    return account;
  }

  async findAll() {
    return await this.accountsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.accountsRepository.findOne(id);
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  async remove(id: string) {
    return `This action removes a #${id} account`;
  }
}
