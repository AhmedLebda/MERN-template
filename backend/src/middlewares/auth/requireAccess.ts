import AuthHelper from "../../utils/helpers/auth_helpers";
import asyncHandler from "express-async-handler";
import UserModel from "../../models/user";
import { UserWithId } from "../../types/types";
import { InactiveAccountError, JwtError } from "../../utils/custom-errors";

/* 
* => Gives access to:
---------------------
* - Valid access token
* - Active account
*/
const requireAccessToken = asyncHandler(async (req, _res, next) => {
	const token = AuthHelper.getBearerToken(req);
	const decodedToken = AuthHelper.verifyAccessToken(token);

	if (typeof decodedToken === "string" || !decodedToken.id)
		throw new JwtError("invalid token");

	const currentUser = await UserModel.findById(decodedToken.id)
		.select("username active roles")
		.lean();
	if (!currentUser) throw Error("User not found");

	const isActive = currentUser.active;

	if (!isActive) throw new InactiveAccountError();

	req.user = currentUser as UserWithId;

	next();
});

export default requireAccessToken;
