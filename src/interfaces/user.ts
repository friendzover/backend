import { FriendModel } from "../models/friend";
import { FoodModel } from "../models/food";


export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  friends: [FriendModel];
  foods: [FoodModel];
  verified: boolean;
  verifyCode: string;
  verifyExp: Date;
}
