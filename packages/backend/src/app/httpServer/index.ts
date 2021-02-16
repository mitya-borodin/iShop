import { User } from "@rtcts/ishop-shared";
import { Config, getAuthenticateStrategyMiddleware, KoaServer, UserModel } from "@rtcts/node";
import logger from "koa-logger";
import { productHttpTransport } from "../../components/product/productHttpTransport";
import { userHttpTransport } from "../../components/user/userHttpTransport";
import { userModel } from "../../components/user/userModel";
import { config } from "../config";

export const httpServer = new KoaServer(config);

// ! HTTP Logger
httpServer.setMiddleware(logger());

// ! Auth Authenticate Strategy
httpServer.setMiddleware(
  getAuthenticateStrategyMiddleware<UserModel<User, Config>, User, Config>(config, userModel),
);

// ! Application routes
httpServer.setRouter(userHttpTransport.getRouter());
httpServer.setRouter(productHttpTransport.getRouter());
