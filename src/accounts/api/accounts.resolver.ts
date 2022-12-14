import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AccountsService } from "../domain/accounts.service";
import { Account } from "../domain/entities/account.entity";
import { CreateAccountDto } from "./dto/create-account.dto";
import { ActivateAccountDto } from "./dto/activate-account.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { UseGuards } from "@nestjs/common";
import { JwtGqlGuard } from "backend-common";
import { ThrottlerGqlGuard } from "backend-common";
import { AuthenticatedUser } from "backend-common";
import { AuthUser } from "backend-common";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => AuthResponseDto)
  @UseGuards(ThrottlerGqlGuard)
  async createAccount(
    @Args("createAccountDto") createAccountDto: CreateAccountDto,
  ) {
    return await this.accountsService.create(createAccountDto);
  }

  @Mutation(() => AuthResponseDto)
  @UseGuards(ThrottlerGqlGuard)
  async activateAccount(
    @Args("activateAccountDto") activateAccountDto: ActivateAccountDto,
  ) {
    return await this.accountsService.activate(activateAccountDto);
  }

  @Query(() => AuthResponseDto)
  @UseGuards(ThrottlerGqlGuard)
  async login(@Args("loginDto") loginDto: LoginDto) {
    return await this.accountsService.login(loginDto);
  }

  @Query(() => Account)
  @UseGuards(JwtGqlGuard)
  async findAccount(@Args("username") username: string) {
    return await this.accountsService.findOne(username);
  }

  @Mutation(() => Account)
  @UseGuards(JwtGqlGuard)
  async deleteAccount(@AuthenticatedUser() authUser: AuthUser) {
    return await this.accountsService.deleteOne(authUser.username);
  }

  @Query(() => Boolean)
  @UseGuards(ThrottlerGqlGuard)
  async forgotPassword(@Args("email") email: string) {
    return await this.accountsService.forgotPassword(email);
  }

  @Mutation(() => Account)
  @UseGuards(ThrottlerGqlGuard)
  async resetPassword(
    @Args("resetPasswordDto") resetPasswordDto: ResetPasswordDto,
  ) {
    return await this.accountsService.resetPassword(resetPasswordDto);
  }

  @Query(() => Boolean)
  async checkUsername(@Args("username") username: string) {
    return await this.accountsService.checkUsername(username);
  }

  @Query(() => Boolean)
  @UseGuards(ThrottlerGqlGuard, JwtGqlGuard)
  async sendActivationEmail(@AuthenticatedUser() authUser: AuthUser) {
    return await this.accountsService.sendActivationEmail(authUser);
  }
}
