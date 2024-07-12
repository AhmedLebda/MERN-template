import { body } from "express-validator";

export default [
    // body("email")
    //     .trim()
    //     .notEmpty()
    //     .withMessage("This field can't be empty")
    //     .isEmail()
    //     .withMessage("Please enter a valid email")
    //     .escape(),

    body("username")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("This field can't be empty")
        .isLength({ min: 3, max: 30 })
        .withMessage(
            "username can't be lower than 3 chars or longer than 30 chars"
        )
        .escape(),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("This field can't be empty")
        .escape(),
];
