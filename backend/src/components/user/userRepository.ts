import { MongoDBRepository } from "@rtcts/node";
import { User } from "../../../../shared";
import { mongoDBConnection } from "../../app/db";

export const userRepository = new MongoDBRepository<User>("users", mongoDBConnection, User, {});
