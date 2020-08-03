import { MongoDBConnection } from "@rtcts/node";
import { config } from "../config";

export const mongoDBConnection = new MongoDBConnection(config);
