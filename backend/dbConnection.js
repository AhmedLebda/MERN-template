import mongoose from "mongoose";
import config from "./utils/config.js";

async function dbConnection() {
    const dbName = config.MONGO_URI.split("=").slice(-1);
    console.log(`connecting to db: ${dbName}`);
    await mongoose.connect(config.MONGO_URI);
    console.log(`Successfully connected to db: ${dbName}`);
}

export default dbConnection;
