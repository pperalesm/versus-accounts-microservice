import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { CreateAccountDto } from "../api/dto/create-account.dto";
import { ActivateAccountDto } from "../api/dto/activate-account.dto";
import { AccountsRepository } from "../infrastructure/accounts.repository";
import { Account } from "./entities/account.entity";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import { Constants } from "src/constants";

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
      token: crypto.randomUUID(),
      password: await bcrypt.hash(
        createAccountInput.password,
        Constants.SALT_ROUNDS,
      ),
    });

    account = await this.accountsRepository.create(account);

    this.mailerService
      .sendMail({
        to: account.email,
        subject: "Versus account activation",
        html: `<p>Please follow this <a href="https://versus.gg/auth/activate?id=${account.id}&token=${account.token}" target="_blank" rel="noopener noreferrer">link</a> to activate your Versus account!<p>`,
      })
      .catch(() => {});

    return account;
  }

  async activate(activateAccountDto: ActivateAccountDto) {
    let account = await this.accountsRepository.findOne(activateAccountDto.id);

    if (!account || account.token != activateAccountDto.token) {
      throw new Error(); // ------------------------> TODO: Configure all returned errors <------------------------
    }

    account.active = true;
    account.token = null;

    account = await this.accountsRepository.update(account);

    return account;
  }

  async findAll() {
    return await this.accountsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.accountsRepository.findOne(id);
  }

  async remove(id: string) {
    return `This action removes a #${id} account`;
  }
}
