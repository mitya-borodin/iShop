import { UserRepository as UserRepositoryBase, WSClient } from "@rtcts/browser";
import { User } from "@rtcts/ishop-shared";
import Eventemitter from "eventemitter3";
import { browserHistory } from "../../shared/browserHistory";
import { UserHttpTransport } from "./UserHttpTransport";

export class UserRepository extends UserRepositoryBase<
  UserHttpTransport,
  User,
  WSClient,
  Eventemitter
> {
  async signOut(): Promise<void> {
    await super.signOut();

    browserHistory.replace("/");
  }
}
