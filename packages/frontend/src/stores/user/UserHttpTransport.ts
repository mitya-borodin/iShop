import { UserHTTPTransport, WSClient } from "@rtcts/browser";
import { User } from "@rtcts/ishop-shared";
import Eventemitter from "eventemitter3";

export class UserHttpTransport extends UserHTTPTransport<User, WSClient, Eventemitter> {}
