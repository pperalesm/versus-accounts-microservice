import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ownershipMiddleware } from "../../../common/middleware/ownership.middleware";

@ObjectType()
@Schema({ timestamps: true })
export class Account {
  id: string;

  @Field({ nullable: true, middleware: [ownershipMiddleware] })
  @Prop({ unique: true })
  email: string;

  @Field()
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Field({ nullable: true, middleware: [ownershipMiddleware] })
  @Prop()
  role: string;

  @Field({ nullable: true, middleware: [ownershipMiddleware] })
  @Prop()
  active: boolean;

  @Field()
  @Prop()
  avatarPath: string;

  @Field({ nullable: true, middleware: [ownershipMiddleware] })
  createdAt: Date;

  @Field({ nullable: true, middleware: [ownershipMiddleware] })
  updatedAt: Date;

  @Prop()
  token: string;

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
    token,
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
    token?: string;
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
    this.token = token;
  }
}

export type AccountDocument = Account & Document;

export const AccountSchema = SchemaFactory.createForClass(Account);
