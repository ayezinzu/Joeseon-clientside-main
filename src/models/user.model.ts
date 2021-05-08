import { serializable, alias, primitive, list } from "serializr";
import { UserRoleEnum } from "../enums/userRole.enum";

export class User {
  @serializable(alias("id", primitive()))
  id?: number;

  @serializable(alias("username", primitive()))
  username?: string;

  @serializable(alias("accessToken", primitive()))
  accessToken?: string;

  @serializable(alias("email", primitive()))
  email?: string;

  @serializable(alias("password", primitive()))
  password?: string;

  captchaResponse?: string;

  @serializable(alias("roles", list(primitive())))
  roles: string[] = [UserRoleEnum.USER];

  getUserRole() {
    return this.roles?.join(", ");
  }
}
