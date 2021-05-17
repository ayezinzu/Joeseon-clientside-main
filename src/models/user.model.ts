import { alias, list, primitive, serializable } from "serializr";
import { UserRoleEnum } from "../enums/userRole.enum";
import { UserDocument } from "./UserDocument/userDocument.model";

export class User {
  @serializable(alias("id", primitive()))
  id?: number;

  @serializable(alias("userId", primitive()))
  userId?: number;

  @serializable(alias("document_status", primitive()))
  documentStatus?: number;

  @serializable(alias("username", primitive()))
  username?: string;

  @serializable(alias("accessToken", primitive()))
  accessToken?: string;

  @serializable(alias("email", primitive()))
  email?: string;

  @serializable(alias("password", primitive()))
  password?: string;

  @serializable(alias("confirm_password", primitive()))
  confirmPassword?: string;

  @serializable(alias("old_password", primitive()))
  oldPassword?: string;

  @serializable(alias("new_password", primitive()))
  newPassword?: string;

  @serializable(alias("faction", primitive()))
  faction?: string;

  @serializable(alias("token", primitive()))
  token?: string;

  @serializable(alias("status", primitive()))
  docStatus?: string;

  userDocument?: UserDocument;

  captchaResponse?: string;

  @serializable(alias("roles", list(primitive())))
  roles: string[] = [UserRoleEnum.USER];

  getUserRole() {
    return this.roles?.join(", ");
  }
}
