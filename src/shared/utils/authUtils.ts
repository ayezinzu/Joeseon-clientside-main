import { UserRoleEnum } from "../../enums/userRole.enum";

export const isAdminOrModerator = (userRoles?: string[]) => {
  return (
    userRoles &&
    (userRoles?.includes(UserRoleEnum.ADMIN) ||
      userRoles?.includes(UserRoleEnum.MODERATOR))
  );
};
