import { test, describe, after, beforeEach } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../app.js";
import User from "../../models/user_model.js";
import { usersInDb } from "../../utils/test_helpers/user_helpers.js";
import AuthHelpers from "../../utils/helpers/auth_helpers.js";

const api = supertest(app);

// ## Reset the db before every test ## //
beforeEach(async () => {
    console.log("resetting db...");
    await User.deleteMany({});
    const user = new User({
        username: "root",
        email: "root@gmail.com",
        password: "UA0FYIgXIYSp2K",
        confirmPassword: "UA0FYIgXIYSp2K",
        firstName: "super",
        lastName: "user",
    });
    user.password = await AuthHelpers.generateHashedPassword(user.password);
    user.confirmPassword = user.password;
    await user.save();

    console.log(`user ${user.fullName} is created!`);
});

describe("Initial db state", () => {
    test("Have one user", async () => {
        const initialUsers = await usersInDb();
        assert.strictEqual(initialUsers.length, 1);
    });

    test("first user username is root", async () => {
        const initialUsers = await usersInDb();
        const username = initialUsers[0].username;
        assert.strictEqual(username, "root");
    });
});

describe("User Creation", () => {
    test("successfully add user to db with correct data", async () => {
        const initialUsers = await usersInDb();

        const user = {
            username: "Lester",
            email: "lester@gmail.com",
            password: "tI8wDvAjVX9N0u",
            confirmPassword: "tI8wDvAjVX9N0u",
            firstName: "Warren",
            lastName: "Castillo",
        };

        const response = await api
            .post("/api/users/signup")
            .send(user)
            .expect(201)
            .expect("Content-Type", /json/);

        const updatedUsers = await usersInDb();
        assert.strictEqual(updatedUsers.length, initialUsers.length + 1);
        assert.strictEqual(response.body.username, updatedUsers[1].username);
    });

    test("Fail to add user to db with incorrect data", async () => {
        const initialUsers = await usersInDb();

        const user = {};

        await api.post("/api/users/signup").send(user).expect(400);

        const updatedUsers = await usersInDb();

        assert.strictEqual(updatedUsers.length, initialUsers.length);
    });

    test("Fail to add user with existing username", async () => {
        const initialUsers = await usersInDb();

        const user = {
            username: "root",
            email: "root@gmail.com",
            password: "UA0FYIgXIYSp2K",
            confirmPassword: "UA0FYIgXIYSp2K",
            firstName: "super",
            lastName: "user",
        };

        await api.post("/api/users/signup").send(user).expect(400);

        const updatedUsers = await usersInDb();

        assert.strictEqual(updatedUsers.length, initialUsers.length);
    });
});

describe("user Login", () => {
    test("Login: Successfully with valid credentials", async () => {
        const userData = { username: "root", password: "UA0FYIgXIYSp2K" };

        const res = await api
            .post("/api/users/login")
            .send(userData)
            .expect(200)
            .expect("Content-Type", /json/);

        assert(Object.keys(res.body).includes("access_token"));
    });

    test("Login: Fail with invalid credentials", async () => {
        const userData = { username: "root", password: "UA0" };
        const res = await api
            .post("/api/users/login")
            .send(userData)
            .expect(400)
            .expect("Content-Type", /json/);

        assert(Object.keys(res.body).includes("error"));
    });
});

// ## Close the db connection after running all tests ## //
after(async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
});
