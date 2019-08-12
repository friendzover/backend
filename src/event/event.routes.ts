import * as express from "express";

import controller from "./event.controller";
import auth from "../auth/auth.controller";

class EventRouter {
	public router: express.Router;

	constructor() {
		this.router = express.Router();

		this.router.get("/user/:userId", async (req, res) => {
			try {
				const { userId } = req.params;
				const events = await controller.getEventsByUser(userId);
				res.status(200).json({
					events
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.get("/get", async (_, res) => {
			try {
				const events = await controller.getEvents();
				res.status(200).json({
					events
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.get("/get/:eventId", async (req, res) => {
			try {
				const { eventId } = req.params;
				const event = await controller.getEvent(eventId);
				res.status(200).json({
					event
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.put("/new", auth.requireLogin, async (req: any, res) => {
			try {
				const event = await controller.newEvent(req.body, req.user._id);
				res.status(200).json({
					event
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.put(
			"/add/:eventId/:friendId",
			auth.requireLogin,
			async (req: any, res) => {
				try {
					const { eventId, friendId } = req.params;
					const event = await controller.addFriend(req.user._id, eventId, friendId);
					res.status(200).json({
						event
					});
				} catch (error) {
					res.status(400).json({
						error: error.message
					});
				}
			}
		);
	}
}

export default new EventRouter().router;
