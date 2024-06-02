import { body } from "express-validator";

export default [
    body("firstName")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("This field can't be empty")
        .isAlpha()
        .withMessage("First name can't be a number")
        .isLength({ min: 3, max: 20 })
        .withMessage(
            "First name can't be lower than 3 chars or longer than 20 chars"
        )
        .escape(),

    body("lastName")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("This field can't be empty")
        .isAlpha()
        .withMessage("Last name can't be a number")
        .isLength({ min: 3, max: 20 })
        .withMessage(
            "Last name can't be lower than 3 chars or longer than 20 chars"
        )
        .escape(),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("This field can't be empty")
        .isEmail()
        .withMessage("Please enter a valid email")
        .isLength({ min: 3, max: 40 })
        .withMessage("Email is too long")
        .escape(),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("This field can't be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be longer than 6 characters")
        .escape(),

    body("confirmPassword")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords doesn't match"),
];
