import { User, userGroupEnum, webSocketChannelsEnum } from "@rtcts/ishop-shared";
import { pubSub } from "../../shared/pubSub";
import { wsClient } from "../ws";
import { AddUserFormStore } from "./AddUserForm";
import { ChangeLoginFormStore } from "./ChangeLoginForm";
import { ChangePasswordFormStore } from "./ChangePasswordForm";
import { PasswordRecoveryFormStore } from "./PasswordRecoveryForm";
import { SignInFormStore } from "./SignInForm";
import { SignUpFormStore } from "./SignUpForm";
import { UserHttpTransport } from "./UserHttpTransport";
import { UserRepository } from "./UserRepository";

export const userHttpTransport = new UserHttpTransport(
  "user",
  User,
  wsClient,
  webSocketChannelsEnum.USER_CHANNEL,
  {
    collection: [userGroupEnum.admin, userGroupEnum.manager],
    read: [userGroupEnum.admin],
    create: [userGroupEnum.admin],
    update: [],
    remove: [userGroupEnum.admin],
    subscribeToChannel: [userGroupEnum.admin],
    unsubscribeFromChannel: [userGroupEnum.admin],
    updateLogin: [userGroupEnum.admin],
    updatePassword: [userGroupEnum.admin],
    updateGroup: [userGroupEnum.admin],
  },
  pubSub,
);

export const userRepository = new UserRepository(
  userHttpTransport,
  User,
  wsClient,
  webSocketChannelsEnum.USER_CHANNEL,
  pubSub,
);

export const signInFormStore = new SignInFormStore(userRepository);

export const signUpFormStore = new SignUpFormStore(userRepository);

export const passwordRecoveryFormStore = new PasswordRecoveryFormStore(userRepository);

export const addUserFormStore = new AddUserFormStore(userRepository);

export const changeLoginFormStore = new ChangeLoginFormStore(userRepository);

export const changePasswordFormStore = new ChangePasswordFormStore(userRepository);
