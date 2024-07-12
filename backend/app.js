import express from "express";
// routes
import index_Route from "./routes/index.mjs";
import user_Routes from "./routes/user.mjs";
// middlewares
import "express-async-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import errorhandler from "./middlewares/error_handler/errorHandler";
// db
import dbConnection from "./dbConnection";

// Init express app
const app = express();

// db connection
dbConnection();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("tiny"));

// Routes
app.use("/api", index_Route);
app.use("/api/users", user_Routes);

// Unknown endpoint
app.use((req, res) => {
    res.status(404).json({ error: "unknown endpoint" });
});

// Error handler middleware
app.use(errorhandler);

export default app;
