import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AccountsService } from "../domain/accounts.service";
import { Account } from "../domain/entities/account.entity";
import { CreateAccountDto } from "./dto/create-account.dto";
import { ActivateAccountDto } from "./dto/activate-account.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { UseGuards } from "@nestjs/common";
import { JwtGqlGuard } from "src/common/guards/jwt-gql.guard";
import { ThrottlerGqlGuard } from "src/common/guards/throttler-gql.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "src/common/models/current-user.model";

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => Account)
  @UseGuards(ThrottlerGqlGuard)
  async createAccount(
    @Args("createAccountDto") createAccountInput: CreateAccountDto,
  ) {
    return await this.accountsService.create(createAccountInput);
  }

  @Mutation(() => Account)
  @UseGuards(ThrottlerGqlGuard)
  async activateAccount(
    @Args("activateAccountDto") activateAccountDto: ActivateAccountDto,
  ) {
    return await this.accountsService.activate(activateAccountDto);
  }

  @Query(() => LoginResponseDto)
  @UseGuards(ThrottlerGqlGuard)
  async login(@Args("loginDto") loginDto: LoginDto) {
    return await this.accountsService.login(loginDto);
  }

  @Query(() => Account)
  @UseGuards(JwtGqlGuard)
  async findAccount(@Args("id") id: string) {
    return await this.accountsService.findOne(id);
  }

  @Mutation(() => Account)
  @UseGuards(JwtGqlGuard)
  async removeAccount(@CurrentUser() currentUser: User) {
    return await this.accountsService.remove(currentUser);
  }
}
