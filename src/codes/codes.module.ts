import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CodesService } from "./domain/codes.service";
import { Code, CodeSchema } from "./infrastructure/code.schema";
import { CodesRepository } from "./infrastructure/codes.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Code.name, schema: CodeSchema }]),
    CodesModule,
  ],
  providers: [CodesService, CodesRepository],
  exports: [CodesService],
})
export class CodesModule {}
