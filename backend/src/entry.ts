/* eslint-disable @typescript-eslint/no-floating-promises */
import { mongoDBConnection } from "./app/db";
import { httpServer } from "./app/httpServer";
import { webSocketServer } from "./app/WSServer";
import { userModel } from "./components/user/userModel";

(async () => {
  await mongoDBConnection.connect();
  await userModel.init();
  await httpServer.run();
  webSocketServer.run();
})();
