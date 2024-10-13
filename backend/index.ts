import config from "./src/utils/config";
import app from "./app.js";
import mongoose from "mongoose";
import dbConnection from "./src/utils/dbConnection";

// Starting Server
await dbConnection();

mongoose.connection.once("open", async () => {
	app.listen(config.PORT, () =>
		console.log("your server is running on port:" + config.PORT)
	);
});
