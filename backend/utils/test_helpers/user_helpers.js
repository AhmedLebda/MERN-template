import User from "../../models/user_model.js";

export const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};
