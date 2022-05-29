import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AccountsService } from "../domain/accounts.service";
import { Account } from "../domain/entities/account.entity";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => Account)
  async createAccount(
    @Args("createAccountDto") createAccountInput: CreateAccountDto,
  ) {
    return await this.accountsService.create(createAccountInput);
  }

  @Query(() => [Account])
  findAll() {
    return this.accountsService.findAll();
  }

  @Query(() => Account)
  async findOne(@Args("id") id: string) {
    return await this.accountsService.findOne(id);
  }

  @Mutation(() => Account)
  async updateAccount(
    @Args("updateAccountDto") updateAccountDto: UpdateAccountDto,
  ) {
    return await this.accountsService.update(
      updateAccountDto.id,
      updateAccountDto,
    );
  }

  @Mutation(() => Account)
  async removeAccount(@Args("id") id: string) {
    return await this.accountsService.remove(id);
  }
}
