import Food, { FoodModel } from "../models/food";
import User from "../models/user";

class FoodController {
  public async getFood(id: string): Promise<FoodModel> {
    return await Food.findById(id);
  }

	public async getFoods(): Promise<FoodModel[]> {
		return await Food.find();
	}

	public async getFoodsByUser(userId: string): Promise<FoodModel[]> {
		const user = await User.findById(userId).populate("foods");
		return user.foods;
	}

	public async newFood(
		foodBody: FoodModel,
		userId: string
	): Promise<FoodModel> {
    const food = new Food(foodBody);
    const user = await User.findById(userId);
    food.user = user;
    user.foods.push(food);
    await food.save();
    await user.save();
		return food;
	}
}

export default new FoodController();
