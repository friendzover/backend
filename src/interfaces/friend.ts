import { UserModel } from "../models/user";
import { FoodModel } from "../models/food";

export interface Friend {
  firstName: string;
  lastName?: string;
  phoneNumber: number;
  allergies?: [string];
  friendOf: [UserModel | string];
  likes?: [FoodModel];
  dislikes?: [FoodModel];
}