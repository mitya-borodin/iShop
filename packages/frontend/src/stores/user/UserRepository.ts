import { UserRepository as UserRepositoryBase, WSClient } from "@rtcts/browser";
import { User, userGroupEnum } from "@rtcts/ishop-shared";
import Eventemitter from "eventemitter3";
import { computed } from "mobx";
import { browserHistory } from "../../shared/browserHistory";
import { UserHttpTransport } from "./UserHttpTransport";

export class UserRepository extends UserRepositoryBase<
  UserHttpTransport,
  User,
  WSClient,
  Eventemitter
> {
  @computed({ name: "UserRepository.isManager" })
  get isManager(): boolean {
    return this.group === userGroupEnum.manager;
  }

  @computed({ name: "UserRepository.isClient" })
  get isClient(): boolean {
    return this.group === userGroupEnum.client;
  }

  async signOut(): Promise<void> {
    await super.signOut();

    browserHistory.replace("/");
  }
}
