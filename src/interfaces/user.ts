import { FriendModel } from "../models/friend";
import { FoodModel } from "../models/food";
import { EventModel } from "../models/event";


export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  friends: [FriendModel];
  foods: [FoodModel];
  events: [EventModel];
  verified: boolean;
  verifyCode: string;
  verifyExp: Date;
}
