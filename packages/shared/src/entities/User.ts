import { User as UserBase, UserData as UserDataBase } from "@rtcts/isomorphic";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserData extends UserDataBase {}

export class User extends UserBase {}
