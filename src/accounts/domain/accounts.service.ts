import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { CreateAccountDto } from "../api/dto/create-account.dto";
import { ActivateAccountDto } from "../api/dto/activate-account.dto";
import { LoginDto } from "../api/dto/login.dto";
import { AccountsRepository } from "../infrastructure/accounts.repository";
import { Account } from "./entities/account.entity";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import { Constants } from "src/constants";
import { isEmail } from "class-validator";
import { LoginResponseDto } from "../api/dto/login-response.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/common/models/current-user.model";

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
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
        html: `<p>Please follow this <a href="https://${process.env.FRONTEND_URL}/auth/activate?id=${account.id}&token=${account.token}" target="_blank" rel="noopener noreferrer">link</a> to activate your Versus account!<p>`,
      })
      .catch(() => {});

    return account;
  }

  async activate(activateAccountDto: ActivateAccountDto) {
    const updateInfo = new Account({ active: true, token: null });

    const account = await this.accountsRepository.updateOne(
      { ...activateAccountDto },
      updateInfo,
    );

    return account;
  }

  async login(loginDto: LoginDto) {
    let account: Account;

    if (isEmail(loginDto.user)) {
      account = await this.accountsRepository.findOne({ email: loginDto.user });
    } else {
      account = await this.accountsRepository.findOne({
        username: loginDto.user,
      });
    }

    const samePassword = account
      ? await bcrypt.compare(loginDto.password, account.password)
      : (await bcrypt.compare(
          loginDto.password,
          "$2b$12$nX2Qho1WTjnY3uxPpA/qGuFZIJbK64rKb7/0wlBzxXMQuwHLqq09W",
        )) && false;

    if (!samePassword) {
      throw new Error();
    }

    return new LoginResponseDto({
      token: this.jwtService.sign({
        id: account.id,
        role: account.role,
        active: account.active,
      }),
      account: account,
    });
  }

  async findOne(id: string) {
    return await this.accountsRepository.findById(id);
  }

  async remove(user: User) {
    return await this.accountsRepository.removeById(user.id);
  }
}
