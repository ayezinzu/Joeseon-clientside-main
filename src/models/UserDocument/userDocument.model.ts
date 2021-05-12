import { serializable, alias, primitive, list } from "serializr";

export class UserDocument {
  @serializable(alias("id", primitive()))
  id?: number;

  @serializable(alias("url", primitive()))
  url?: string;

  @serializable(alias("status", primitive()))
  status?: string;
}
