import { Express } from "express";
import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import auth from "./auth/auth.controller";

import Auth from "./auth/auth.routes";
import Food from "./food/food.routes";
import Friend from "./friend/friend.routes";
import Event from "./event/event.routes"

class Server {
	public server: Express;

	constructor() {
		this.server = express();
		this.connectDb();
		this.applyMiddleware();
		this.mountRoutes();
	}

	private connectDb(): void {
		const mongo = process.env.MONGO_URI;
		mongoose.connect(mongo, {
			useNewUrlParser: true,
			useCreateIndex: true
		});
		const db = mongoose.connection;
		db.on("error", console.error.bind(console, "MongoDB Connection error"));
	}

	private applyMiddleware(): void {
		this.server.use(bodyParser.json());
		this.server.use(bodyParser.urlencoded({ extended: true }));
		this.server.use(auth.authenticate);
		this.server.use(cors());
	}

	private mountRoutes(): void {
		this.server.use("/auth", Auth);
		this.server.use("/food", Food);
		this.server.use("/friend", Friend);
		this.server.use("/event", Event);
	}
}

export default new Server().server;
