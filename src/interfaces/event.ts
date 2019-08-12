import { FriendModel } from "../models/friend";
import { UserModel } from "../models/user";

export interface Event {
  location: string;
  friends: [FriendModel | string]
  host: UserModel | string;
}