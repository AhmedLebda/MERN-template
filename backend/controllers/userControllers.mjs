// Validation
import { validationResult } from "express-validator";
import validateSignup from "../middlewares/validation/signup_form.mjs";
import validateLogin from "../middlewares/validation/login_form.mjs";
// Models
import userModel from "../models/user_model.mjs";
// Utils
import AuthHelpers from "../utils/helpers/auth_helpers";

// Log-in Controller
// ==> Validate the request username and password
// ==> Log-in with login function in auth_helpers module
// ==> Create an access token with username and id
// ==> Send response with user data
// ==> Catch any errors with express-async-errors middleware
const user_login = [
    validateLogin,

    async (req, res) => {
        const errors = validationResult(req);

        // Throw error if there are errors returned from validateLogin middleware
        if (!errors.isEmpty()) {
            throw Error(errors.array());
        }

        const { username, password } = req.body;

        const user = await AuthHelpers.login(username, password);

        const token = AuthHelpers.createAccessToken({
            username: user.username,
            id: user._id,
        });

        res.json({
            access_token: token,
            username: user.username,
            email: user.email,
            name: user.fullName,
            id: user.id,
        });
    },
];

// Sign-up Controller
// ==> Validate the request first name, last name, email, username, password, confirm password
// ==> Hash user password
// ==> Create a new user in the db
// ==> Create an access token with username and id
// ==> Send response with user data
// ==> Catch any errors with express-async-errors middleware
const user_create = [
    validateSignup,

    async (req, res) => {
        const errors = validationResult(req);

        // Throw error if there are errors returned from validateSignup middleware
        if (!errors.isEmpty()) {
            throw Error(errors.array());
        }

        const { firstName, lastName, email, username, password } = req.body;

        const hashedPassword = await AuthHelpers.generateHashedPassword(
            password
        );

        const user = new userModel({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        });

        const savedUser = await user.save();

        const token = AuthHelpers.createAccessToken({
            username: savedUser.username,
            id: savedUser._id,
        });

        res.json({
            access_token: token,
            username: savedUser.savedUsername,
            email: savedUser.email,
            name: savedUser.fullName,
            id: savedUser.id,
        });
    },
];

const userController = { user_login, user_create };

export default userController;
