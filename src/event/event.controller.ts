import Event, { EventModel } from "../models/event";
import User from "../models/user";

class EventController {
	public async getEvent(id: string): Promise<EventModel> {
		return await Event.findById(id);
	}

	public async getEvents(): Promise<EventModel[]> {
		return await Event.find();
	}

	public async getEventsByUser(userId: string): Promise<EventModel[]> {
		const user = await User.findById(userId).populate("events");
		return user.events;
	}

	public async newEvent(
		eventBody: EventModel,
		userId: string
	): Promise<EventModel> {
		const event = new Event(eventBody);
		const user = await User.findById(userId);
		event.host = user;
		user.events.push(event);
		await event.save();
		await user.save();
		return event;
	}

	public async addFriend(
		userId: string,
		eventId: string,
		friendId: string
	): Promise<EventModel> {
		const event = await Event.findById(eventId);
		if (event.host === userId) {
			event.friends.push(friendId);
			await event.save();
			return event;
		} else {
			throw new Error("user is not the host");
		}
	}
}

export default new EventController();
