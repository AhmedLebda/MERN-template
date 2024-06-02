import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import index_Route from "./routes/index.mjs";
import user_Routes from "./routes/user.mjs";

import { checkUser, requireAuth } from "./middlewares/auth/authMiddleware.mjs";

// Init express app
const app = express();

//! db connection
// mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(() =>
//         app.listen(process.env.PORT, () =>
//             console.log("Connected to <db name> db")
//         )
//     )
//     .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
    console.log(`server is running on port: ${process.env.PORT}`)
);

//! middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Checks if there is a user logged in by validating the jwt token in cookies
app.use(checkUser);

//! Routes
app.use("/", index_Route);
app.use("/user", user_Routes);
