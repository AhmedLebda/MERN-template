import { validationResult } from "express-validator";
import validateSignup from "../middlewares/validation/signup_form.mjs";
import validateLogin from "../middlewares/validation/login_form.mjs";
import userModel from "../models/user_model.mjs";
import { createJWT } from "../utils/auth.mjs";

//! Log-in Controllers
const login_post = [
    validateLogin,

    async (req, res) => {
        const errors = validationResult(req);

        const { email, password } = req.body;

        if (!errors.isEmpty()) {
            res.json({ errors: errors.array() });
        } else {
            try {
                const user = await userModel.logUser(email, password);
                const payload = {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    status: user.status,
                };
                const token = createJWT(payload);
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 3 * 24 * 60 * 60 * 1000,
                });
                res.json({ redirect: "/" });
            } catch (error) {
                res.json({ errors: [{ msg: error.message }] });
            }
        }
    },
];

//! Sign-up Controllers
const signup_post = [
    validateSignup,

    async (req, res) => {
        const errors = validationResult(req);

        const user = new userModel(req.body);

        if (!errors.isEmpty()) {
            res.json({ errors: errors.array() });
        } else {
            try {
                await user.save();
                const payload = {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    status: user.status,
                };
                const token = createJWT(payload);
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 3 * 24 * 60 * 60 * 1000,
                });
                res.json({ redirect: "/" });
            } catch (error) {
                if (error.code === 11000) {
                    res.json({
                        errors: [{ msg: "this email already exists" }],
                    });
                }
            }
        }
    },
];

//! Log-out Controllers
const logout_get = (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
    res.json({ redirect: "/" });
};

const userController = { login_post, signup_post, logout_get };

export default userController;
