import { userGroupEnum } from "../enums/userGroupEnum";

export const userGroupSet: Set<string> = new Set([
  userGroupEnum.admin,
  userGroupEnum.client,
  userGroupEnum.manager,
]);
