import * as express from "express";

import controller from "./friend.controller";
import auth from "../auth/auth.controller";

class FriendRouter {
	public router: express.Router;

	constructor() {
		this.router = express.Router();

		this.router.get("/user/:userId", async (req, res) => {
			try {
				const { userId } = req.params;
				const friends = await controller.getFriendsByUser(userId);
				res.status(200).json({
					friends
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.get("/get", async (req, res) => {
			try {
				const friends = await controller.getFriends();
				res.status(200).json({
					friends
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.get("/get/:friendId", async (req, res) => {
			try {
				const { friendId } = req.params;
				const friend = await controller.getFriend(friendId);
				res.status(200).json({
					friend
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.get("/numb/:number", async (req, res) => {
			try {
				const { number } = req.params;
				const friend = await controller.getFriendByNumber(number);
				res.status(200).json({
					friend
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.put("/new", auth.authenticate, async (req: any, res) => {
			try {
				const friend = await controller.newFriend(req.body, req.user._id);
				res.status(200).json({
					friend
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});
	}
}

export default new FriendRouter().router;
