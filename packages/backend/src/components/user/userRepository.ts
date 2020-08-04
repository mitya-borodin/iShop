import { User } from "@rtcts/ishop-shared";
import { MongoDBRepository } from "@rtcts/node";
import { mongoDBConnection } from "../../app/db";

export const userRepository = new MongoDBRepository<User>("users", mongoDBConnection, User, {});
