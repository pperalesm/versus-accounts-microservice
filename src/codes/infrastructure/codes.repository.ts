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

  async create(inAccount: Code): Promise<Code> {
    const inCodeDocument = new this.codeModel(this.fromDomain(inAccount));
    const outCodeDocument = await inCodeDocument.save();
    return this.toDomain(outCodeDocument);
  }

  toDomain(before: CodeDocument): Code {
    const now = plainToInstance(Code, instanceToPlain(before.toJSON()), {
      excludeExtraneousValues: true,
    });
    now.id = before.id;
    return now;
  }

  fromDomain(before: Code): CodeEntity {
    const now = plainToInstance(CodeEntity, instanceToPlain(before), {
      excludeExtraneousValues: true,
    });
    return now;
  }
}
