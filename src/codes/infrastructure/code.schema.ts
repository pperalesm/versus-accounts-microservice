import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Document } from "mongoose";

export type CodeDocument = Code & Document;

@Schema({ timestamps: true })
export class Code {
  @Expose()
  @Prop()
  type: string;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
