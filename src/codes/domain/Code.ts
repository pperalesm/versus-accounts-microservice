import { Expose } from "class-transformer";

export class Code {
  @Expose()
  id: string;

  @Expose()
  type: string;
}
