import { Types, Document } from "mongoose";

export type Role = "employee" | "manager" | "admin";

export interface UserWithId extends Document {
	_id: Types.ObjectId;
	username: string;
	password: string;
	role: Role;
	active: boolean;
}

export interface CreateUserRequest {
	username: string;
	password: string;
}
