import { Injectable } from "@nestjs/common";
import { Account } from "src/accounts2/domain/Account";
import { CodesRepository } from "../infrastructure/codes.repository";
import { Code } from "./Code";

@Injectable()
export class CodesService {
  constructor(private codesRepository: CodesRepository) {}

  async getCode(account: Account): Promise<Code> {
    const inCode = new Code();
    inCode.accountId = account.id;
    let outCode = await this.codesRepository.update(inCode);
    if (!outCode) {
      outCode = await this.codesRepository.create(inCode);
    }
    return outCode;
  }

  async consume() {}
}
