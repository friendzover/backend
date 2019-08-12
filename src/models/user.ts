import * as validator from "validator";

import { Document, Schema, model, HookNextFunction } from "mongoose";
import { Doc } from "../interfaces/doc";
import { User } from "../interfaces/user";

import { genSalt, hash, compare } from "bcrypt";

export interface UserModel extends User, Doc, Document {
	comparePassword(password: string): boolean;
}

export const UserSchema: Schema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
			validate: [validator.isEmail, "Invalid email."]
		},
		password: {
			type: String,
			min: [6, "Password too short."],
			max: [20, "Password too long."],
			required: true,
			validate: [
				function(password: string) {
					if (!this.isModified("password")) {
						return true;
					} else {
						return /([A-Z]+){1,}([a-z]+){1,}([0-9]+){1,}([?!@#$%^&*()_\-+=/\\.,<>;:'"]){1,}/g.test(
							password
						);
					}
				},
				"Password must contain an uppercase letter, lowercase letter, a number, and a symbol."
			]
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "Friend"
			}
		],
		foods: [
			{
				type: Schema.Types.ObjectId,
				ref: "Food"
			}
		],
		events: [
			{
				type: Schema.Types.ObjectId,
				ref: "Event"
			}
		],
		verified: {
			type: Boolean,
			required: true
		},
		verifyCode: {
			type: String
		},
		verifyExp: {
			type: Date
		}
	},
	{ timestamps: true }
);

UserSchema.pre("save", function(this: UserModel, next: HookNextFunction) {
	if (!this.isModified("password")) {
		next();
	} else {
		genSalt(10, (err: Error, salt: string) => {
			if (err) {
				next();
			}
			hash(this.password, salt, (err: Error, hash: string) => {
				if (err) {
					next();
				}
				this.password = hash;
				next();
			});
		});
	}
});

UserSchema.methods.comparePassword = async function(
	password: string
): Promise<boolean> {
	return await compare(password, this.password);
};

export default model<UserModel>("User", UserSchema);
