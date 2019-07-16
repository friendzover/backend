import { FriendModel } from "../models/friend";


export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  friends: [FriendModel];
  verified: boolean;
  verifyCode: string;
  verifyExp: Date;
}
