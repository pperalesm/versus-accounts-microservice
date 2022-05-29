import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@ObjectType()
@Schema({ timestamps: true })
export class Account {
  @Field()
  id: string;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  username: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  role: string;

  @Field()
  @Prop()
  active: boolean;

  @Field()
  @Prop()
  avatarPath: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor({
    id,
    email,
    username,
    password,
    role,
    active,
    avatarPath,
    createdAt,
    updatedAt,
  }: {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: string;
    active?: boolean;
    avatarPath?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = role;
    this.active = active;
    this.avatarPath = avatarPath;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export type AccountDocument = Account & Document;

export const AccountSchema = SchemaFactory.createForClass(Account);
