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
    const account = new Account({
      avatarPath: "defaultAvatar.png",
      ...createAccountInput,
      role: "CLIENT",
      active: false,
    });
    await this.mailerService.sendMail({
      to: "pperalesm@gmail.com", // list of receivers
      subject: "Testing Nest MailerModule ✔", // Subject line
      text: "welcome", // plaintext body
      html: "<b>welcome</b>", // HTML body content
    });
    return await this.accountsRepository.create(account);
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
