import { Config, getAuthenticateStrategyMiddleware, KoaServer, UserModel } from "@rtcts/node";
import { User } from "../../../../shared";
import { productHttpTransport } from "../../components/product/productHttpTransport";
import { userHttpTransport } from "../../components/user/userHttpTransport";
import { userModel } from "../../components/user/userModel";
import { config } from "../config";

export const httpServer = new KoaServer(config);

// ! Auth Authenticate Strategy
httpServer.setMiddleware(
  getAuthenticateStrategyMiddleware<UserModel<User, Config>, User, Config>(config, userModel),
);

// ! Application routes
httpServer.setRouter(userHttpTransport.getRouter());
httpServer.setRouter(productHttpTransport.getRouter());
