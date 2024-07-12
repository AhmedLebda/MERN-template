import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "please enter your first name"],
            minlength: [3, "your name is too short!"],
            maxLength: [30, "first name is too long"],
            lowercase: true,
        },
        lastName: {
            type: String,
            required: [true, "please enter your last name"],
            minlength: [3, "your name is too short!"],
            maxLength: [30, "last name is too long"],
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "please enter your email"],
            unique: [true, "This email already exists"],
        },
        username: {
            type: String,
            minLength: [3, "username is too short"],
            maxLength: [30, "username is too long"],
            required: [true, "Please enter a username"],
            unique: [true, "This username already exists"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "please enter a password"],
        },
        confirmPassword: {
            type: String,
            required: [true, "please enter a password"],
        },
        status: { type: String, default: "basic" },
    },
    { timestamps: true }
);

// Virtual to return the user full name
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// transform _id to id and remove __v, password, confirmPassword from json return
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
        delete returnedObject.confirmPassword;
    },
});

export default model("User", userSchema);
