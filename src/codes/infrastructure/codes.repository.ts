import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Model } from "mongoose";
import { Code } from "../domain/Code";
import { CodeDocument, Code as CodeEntity } from "./code.schema";

@Injectable()
export class CodesRepository {
  constructor(
    @InjectModel(CodeEntity.name)
    private codeModel: Model<CodeDocument>,
  ) {}

  async create(inCode: Code): Promise<Code> {
    const outCodeDocument = await this.codeModel.create(inCode);
    return this.toDomain(outCodeDocument);
  }

  async update(inCode: Code): Promise<Code> {
    const outCodeDocument = await this.codeModel.findOneAndUpdate(
      { accountId: inCode.accountId },
      { accountId: inCode.accountId },
      { returnOriginal: false },
    );
    let outCode: Code = null;
    if (outCodeDocument) {
      outCode = this.toDomain(outCodeDocument);
    }
    return outCode;
  }

  toDomain(before: any): Code {
    const now = plainToInstance(Code, instanceToPlain(before), {
      excludeExtraneousValues: true,
    });
    if (before.id) {
      now.id = before.id;
    }
    return now;
  }
}
