import { Document, Schema, model } from "mongoose";
import { Doc } from "../interfaces/doc";
import { Food } from "../interfaces/food";

export interface FoodModel extends Food, Doc, Document {}

export const FoodSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	altNames: [
		{
			type: String
		}
	],
	allergens: [
		{
			type: String
		}
	],
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
});

export default model<FoodModel>("Food", FoodSchema);
