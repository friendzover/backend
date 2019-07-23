import { Document, Schema, model } from "mongoose";
import { Doc } from "../interfaces/doc";
import { Friend } from "../interfaces/friend";

export interface FriendModel extends Friend, Doc, Document {}

export const FriendSchema: Schema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String
	},
	phoneNumb: {
		type: Number
	},
	allergies: [
		{
			type: String
		}
	],
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Food"
		}
	],
	dislikes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Food"
		}
	],
});

export default model<FriendModel>("Friend", FriendSchema);
