import { User } from "@rtcts/ishop-shared";
import { UserModel } from "@rtcts/node";
import { config, Config } from "../../app/config";
import { concreteChannels } from "../../app/WSServer/concreteChannels";
import { userRepository } from "./userRepository";

export const userModel = new UserModel<User, Config>(
  User,
  userRepository,
  concreteChannels.sendUser,
  config,
);
