import { UserWithId } from "../types";

declare global {
	namespace Express {
		interface Request {
			user?: UserWithId;
		}
	}
}
