import { User, userGroupEnum } from "@rtcts/ishop-shared";
import { UserHttpTransport, UserModel } from "@rtcts/node";
import { Config } from "../../app/config";
import { concreteChannels, ConcreteChannels } from "../../app/WSServer/concreteChannels";
import { userModel } from "./userModel";

export const userHttpTransport = new UserHttpTransport<
  UserModel<User, Config>,
  User,
  Config,
  ConcreteChannels
>(
  "user",
  User,
  userModel,
  concreteChannels,
  {
    getList: [userGroupEnum.admin, userGroupEnum.manager],
    getItem: [userGroupEnum.admin],
    create: [userGroupEnum.admin],
    update: [],
    remove: [userGroupEnum.admin],
    channel: [],
    updateLogin: [userGroupEnum.admin],
    updatePassword: [userGroupEnum.admin],
    updateGroup: [userGroupEnum.admin],
    signUp: [],
    signOut: [],
  },
  {
    getList: true,
    getItem: false,
    create: true,
    update: true,
    remove: true,
    channel: true,
    updateLogin: true,
    updatePassword: true,
    updateGroup: true,
    signUp: true,
    signOut: true,
  },
);
