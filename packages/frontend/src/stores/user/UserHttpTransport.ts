import { UserHTTPTransport, WSClient } from "@rtcts/browser";
import type { User } from "@rtcts/ishop-shared";
import type Eventemitter from "eventemitter3";

export class UserHttpTransport extends UserHTTPTransport<User, WSClient, Eventemitter> {}
