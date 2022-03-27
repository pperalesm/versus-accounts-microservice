import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { AccountsService } from "../domain/accounts.service";
import { InSignupDto, OutSignupDto } from "./dto/signup.dto";
import { InLoginDto } from "./dto/login.dto";
import { InActivateDto } from "./dto/activate.dto";
import { InResetDto } from "./dto/reset.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Account } from "../domain/Account";
import { CodesService } from "src/codes/domain/codes.service";

@Controller("accounts")
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly codesService: CodesService,
  ) {}

  @Post("signup")
  async signup(@Body() inSignupDto: InSignupDto) {
    const inAccount = this.toDomain(inSignupDto);
    const outAccount = await this.accountsService.signup(inAccount);
    this.codesService.generateActivationCode();
    const outSignupDto = plainToInstance(
      OutSignupDto,
      instanceToPlain(outAccount),
      {
        excludeExtraneousValues: true,
      },
    );
    return outSignupDto;
  }

  @Get("activate")
  activate(@Body() inActivateDto: InActivateDto) {}

  @Post("login")
  login(@Body() loginDto: InLoginDto) {}

  @Get("reset")
  reset(@Body() resetDto: InResetDto) {}

  @Get(":id")
  findOne(@Param("id") id: number) {}

  @Delete(":id")
  remove(@Param("id") id: number) {}

  toDomain(before: InSignupDto): Account {
    return plainToInstance(Account, instanceToPlain(before), {
      excludeExtraneousValues: true,
    });
  }
}
