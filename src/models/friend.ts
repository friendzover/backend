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
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date
	},
	allergies: [
		{
			type: String
		}
	],
	likes: [
		{
			type: String // will be food schema
		}
	],
	dislikes: [
		{
			type: String // will be food schema
		}
	]
});

export default model<FriendModel>("Friend", FriendSchema);
