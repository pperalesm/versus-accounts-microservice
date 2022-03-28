import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CodeDocument = Code & Document;

@Schema({ timestamps: true })
export class Code {
  @Prop({ unique: true })
  accountId: string;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
