import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "please enter your first name"],
            minlength: [3, "your name is too short!"],
            lowercase: true,
        },
        lastName: {
            type: String,
            required: [true, "please enter your last name"],
            minlength: [3, "your name is too short!"],
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "please enter your email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "please enter a password"],
            minlength: [6, "Your password must be longer than 6 characters"],
        },
        confirmPassword: {
            type: String,
            required: [true, "please enter a password"],
            minlength: [6, "Your password must be longer than 6 characters"],
        },
        status: { type: String, default: "basic" },
    },
    {
        timestamps: true,
    }
);

//! Virtual
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

//! Encrypt Password before saving to db
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = this.password;
    next();
});

//! User Authentication
userSchema.statics.logUser = async function (email, password) {
    const user = await this.findOne({ email: email });
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            return user;
        }
        throw new Error("invalid email or password");
    }
    throw new Error("invalid email or password");
};

export default model("User", userSchema);
