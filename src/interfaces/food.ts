import { UserModel } from "../models/user";

export interface Food {
  name: string;
  altNames?: [string];
  allergens?: [string];
  user: UserModel;
}