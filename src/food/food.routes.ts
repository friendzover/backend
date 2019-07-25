import * as express from "express";

import controller from "./food.controller";
import auth from "../auth/auth.controller";

class FoodRouter {
	public router: express.Router;

	constructor() {
		this.router = express.Router();

		this.router.get("/user/:userId", async (req, res) => {
			try {
				const { userId } = req.params;
				const foods = await controller.getFoodsByUser(userId);
				res.status(200).json({
					foods
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.get("/get", async (req, res) => {
			try {
				const foods = await controller.getFoods();
				res.status(200).json({
					foods
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.get("/get/:foodId", async (req, res) => {
			try {
				const { foodId } = req.params;
				const food = await controller.getFood(foodId);
				res.status(200).json({
					food
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});

		this.router.put("/new", auth.requireLogin, async (req: any, res) => {
			try {
				const food = await controller.newFood(req.body, req.user._id);
				res.status(200).json({
					food
				});
			} catch (error) {
				res.status(400).json({
					error: error.message
				});
			}
		});
	}
}

export default new FoodRouter().router;
