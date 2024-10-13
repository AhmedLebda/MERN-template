import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
	code?: number;
	statusCode: number;
}

const customErrors = [
	"JwtError",
	"InactiveAccountError",
	"AssociatedDataError",
	"MissingConfigError",
	"UserNotFoundError",
];

const errorhandler = (
	error: CustomError,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	console.log("Error Name", error.name);
	console.log("Error Msg", error.message);

	if (error.name === "CastError") {
		res.status(400).json({ error: "invalid id" });
	}
	if (error.name === "Error") {
		res.status(400).json({ error: error.message });
	}
	if (error.name === "MongoServerError" && error.code === 11000) {
		res.status(400).json({ error: "Username already exists" });
	}
	if (error.name === "JsonWebTokenError") {
		res.status(401).json({ error: "Invalid token" });
	}
	if (error.name === "TokenExpiredError") {
		res.status(401).json({ error: "Token expired" });
	}
	if (customErrors.includes(error.name)) {
		res.status(error.statusCode).json({ error: error.message });
	}

	res.status(500).json({ error: "internal Server Error" });
};

export default errorhandler;
