import { body } from "express-validator";

export default [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("This field can't be empty")
        .isEmail()
        .withMessage("Please enter a valid email")
        .escape(),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("This field can't be empty")
        .escape(),
];
