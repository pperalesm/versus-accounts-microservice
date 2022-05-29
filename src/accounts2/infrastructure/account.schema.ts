import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop()
  active: boolean;

  @Prop()
  avatarPath: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
