import { Injectable } from "@nestjs/common";
import { CodesRepository } from "../infrastructure/codes.repository";
import { Code } from "./Code";

@Injectable()
export class CodesService {
  constructor(private accountsRepository: CodesRepository) {}

  async generateActivationCode(): Promise<Code> {
    const code = new Code();
    code.type = "ACTIVATION";
    return await this.accountsRepository.create(code);
  }
}
