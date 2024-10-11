export class JwtError extends Error {
	statusCode: number;

	constructor(message: string) {
		super(message);
		this.statusCode = 401;
		this.name = "JwtError";
	}
}

export class InactiveAccountError extends Error {
	public statusCode: number;

	constructor(message: string = "User account is inactive") {
		super(message);
		this.name = "InactiveAccountError";
		this.statusCode = 403;
	}
}
