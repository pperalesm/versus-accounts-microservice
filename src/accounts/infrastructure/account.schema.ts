import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Document } from "mongoose";

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  @Expose()
  @Prop()
  email: string;

  @Expose()
  @Prop()
  username: string;

  @Expose()
  @Prop()
  password: string;

  @Expose()
  @Prop()
  role: string;

  @Expose()
  @Prop()
  active: boolean;

  @Expose()
  @Prop()
  avatarPath: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
