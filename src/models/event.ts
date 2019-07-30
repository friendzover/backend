import { Document, Schema, model } from "mongoose";
import { Doc } from "../interfaces/doc";
import { Event } from "../interfaces/event";

export interface EventModel extends Event, Doc, Document {}

export const EventSchema: Schema = new Schema({
	location: {
		type: String,
		required: true
	},
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: "Friend"
		}
	],
	host: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	time: {
		type: Date,
		required: true
	}
});

export default model<EventModel>("Event", EventSchema);
