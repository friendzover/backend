import Friend, { FriendModel } from "../models/friend";
import User from "../models/user";

class FriendController {
	public async getFriend(id: string): Promise<FriendModel> {
		return await Friend.findById(id);
	}

	public async getFriends(): Promise<FriendModel[]> {
		return await Friend.find();
	}

	public async getFriendsByUser(userId: string): Promise<FriendModel[]> {
		const user = await User.findById(userId).populate("friends");
		return user.friends;
	}

	public async getFriendByNumber(number: number) {
		return await Friend.find({ number });
	}

	public async newFriend(
		friendBody: FriendModel,
		userId: string
	): Promise<FriendModel> {
		// TODO: parse phone number
		const user = await User.findById(userId);
		let friend = await Friend.findOne({ phoneNumber: friendBody.phoneNumber });
		friend = friend !== null ? friend : new Friend(friendBody);

		friend.friendOf.push(user);
		user.friends.push(friend);
		await friend.save();
		await user.save();
		return friend;
	}
}

export default new FriendController();
