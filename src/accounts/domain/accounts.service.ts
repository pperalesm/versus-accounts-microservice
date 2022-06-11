import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, UnauthorizedException } from "@nestjs/common";
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
import { ResetPasswordDto } from "../api/dto/reset-password.dto";

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    let account = new Account({
      avatarPath: "defaultAvatar.png",
      ...createAccountDto,
      role: "CLIENT",
      active: false,
      token: crypto.randomUUID(),
      password: await bcrypt.hash(
        createAccountDto.password,
        Constants.SALT_ROUNDS,
      ),
    });

    account = await this.accountsRepository.create(account);

    this.mailerService
      .sendMail({
        to: account.email,
        subject: "Versus account activation",
        html: `<p>Please follow this <a href="http://${process.env.FRONTEND_URL}/auth/activate?id=${account.id}&token=${account.token}" target="_blank" rel="noopener noreferrer">link</a> to activate your Versus account!<p>`,
      })
      .catch(() => {});

    return account;
  }

  async activate(activateAccountDto: ActivateAccountDto) {
    return await this.accountsRepository.updateOne(
      { _id: activateAccountDto.id, token: activateAccountDto.token },
      { active: true, $unset: { token: "" } },
    );
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
      throw new UnauthorizedException();
    }

    return new LoginResponseDto({
      token: this.jwtService.sign({
        username: account.username,
        role: account.role,
        active: account.active,
      }),
      account: account,
    });
  }

  async forgotPassword(email: string) {
    const account = await this.accountsRepository.updateOne(
      { email: email },
      { token: crypto.randomUUID() },
    );

    this.mailerService
      .sendMail({
        to: account.email,
        subject: "Versus password reset",
        html: `<p>Please follow this <a href="http://${process.env.FRONTEND_URL}/auth/reset?id=${account.id}&token=${account.token}" target="_blank" rel="noopener noreferrer">link</a> to reset your Versus account password!<p>`,
      })
      .catch(() => {});

    return true;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return await this.accountsRepository.updateOne(
      { _id: resetPasswordDto.id, token: resetPasswordDto.token },
      {
        password: await bcrypt.hash(
          resetPasswordDto.password,
          Constants.SALT_ROUNDS,
        ),
        $unset: { token: "" },
      },
    );
  }

  async findOne(username: string) {
    return await this.accountsRepository.findOne({ username: username });
  }

  async deleteOne(username: string) {
    return await this.accountsRepository.deleteOne({ username: username });
  }

  async checkUsername(username: string) {
    return this.accountsRepository
      .findOne({ username: username })
      .then(() => true)
      .catch(() => false);
  }
}
